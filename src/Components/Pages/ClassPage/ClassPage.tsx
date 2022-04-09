import React, {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "react-router";
import {Video} from "../../Common/Video/Video";
import {Socket} from "socket.io-client";
import {ClassMemberVideo} from "../../Common/types";
import Peer from 'peerjs';

type TClassPage = {
    socket: Socket;
}

export const ClassPage: React.FC<TClassPage> = ({socket}) => {
    let params = useParams();
    const [membersStreams, _setMembersStreams] = useState<Array<ClassMemberVideo>>([]);
    const membersStreamsRef = useRef(membersStreams);
    const setMembersStreams = (data: (prevData: Array<ClassMemberVideo>) => Array<ClassMemberVideo>) => {
        membersStreamsRef.current = data(([]));
        _setMembersStreams(data);
    };
    const [myStream, setMyStream] = useState<MediaStream>();
    const isMemberStreamExist = useCallback((id: string) => {
        return membersStreamsRef.current.find((member) => member.id === id);
    }, []);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: true,
            }).then((stream) => {
            setMembersStreams((prevState) => [...prevState, {id: stream.id, stream: stream, muted: true}]);
            setMyStream(stream);
            console.log(params);
            socket.emit('join-room', params.classId, stream.id);
        });
    }, [params, params.classId, socket]);

    const onCallHandler = useCallback((remoteStream: MediaStream) => {
        if (!isMemberStreamExist(remoteStream.id)) {
            setMembersStreams((prevState) => [...prevState, {
                id: remoteStream.id,
                stream: remoteStream,
                muted: false
            }]);
        }
    }, [isMemberStreamExist]);

    const onAnswerHandler = useCallback((remoteStream) => {
        if (!isMemberStreamExist(remoteStream.id)) {
            setMembersStreams((prevState) => [...prevState, {
                id: remoteStream.id,
                stream: remoteStream,
                muted: false
            }]);
        }
    }, [isMemberStreamExist]);

    const removeDisconnectedUser = useCallback((userId: string) => {
        setMembersStreams((prevData) => [...prevData.filter((memberStream) => memberStream.id !== userId)]);
    }, []);

    useEffect(() => {
        if (myStream) {
            const peer = new Peer(myStream.id);
            //Кто-то нам звонит
            peer.on('call', (call) => {
                call.answer(myStream);
                call.on('stream', (inputCall) => onCallHandler(inputCall));
            });
            //Мы отвечаем на что-то
            socket.on("user-connected", (userId) => {
                const call = peer.call(userId, myStream);
                if (call) {
                    call.on('stream', onAnswerHandler);
                }
            });
            //Пользователь отключился
            socket.on('user-disconnected', (disconnectedUserId) => {
                removeDisconnectedUser(disconnectedUserId);
            });
        }

    }, [isMemberStreamExist, membersStreams, myStream, onAnswerHandler, onCallHandler, params.classId, removeDisconnectedUser, socket]);

    const getMembersVideos = useCallback(() => {
        return (
            membersStreams.map((memberStream) => {
                return <Video {...memberStream} key={memberStream.id}/>;
            })
        )
    }, [membersStreams]);


    return (
        <div>
            {getMembersVideos()}
        </div>
    );
}