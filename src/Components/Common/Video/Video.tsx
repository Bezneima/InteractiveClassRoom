import React, {useEffect, useRef} from "react";
import {ClassMemberVideo} from "../types";

export const Video: React.FC<ClassMemberVideo> = ({stream, muted}) => {
    let videoRef = useRef(null);

    const addVideoStream = (videoTag: any, stream: any) => {
        videoTag.srcObject = stream;
        videoTag.addEventListener('loadedmetadata', () => {
            videoTag.play();
        });
    };

    useEffect(() => {
        if (stream) {
            addVideoStream(videoRef.current, stream)
        }
    }, [stream]);

    return <>
        <video id='1' autoPlay preload="metadata" muted={muted} ref={videoRef}/>
        <video id="2" autoPlay preload="metadata" muted={muted} ref={videoRef}/>
    </>;
};