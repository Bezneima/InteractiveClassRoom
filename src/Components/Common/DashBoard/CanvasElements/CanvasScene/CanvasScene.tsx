import React from "react";
import {Camera} from "../../Camera/Camera";
import {observer} from "mobx-react-lite";
import {MouseController} from "../../Core/MouseController";
import {LeftMenuUI} from "../LeftMenuUI/LeftMenuUI";
import {GlobalEvents} from "../GlobalEvents/GlobalEvents";
import {CanvasRenderer} from "../../Core/CanvasRenderer/CanvasRenderer";

export const CanvasScene: React.FC = observer(() => {
    return (
        <>
            <ambientLight color="white" intensity={1} />
            <LeftMenuUI/>
            <MouseController/>
            <Camera/>
            {/*<Selection dashBoardDispatch={dashBoardDispatch} selection={selection}/>*/}

            {/*<LineElement points={[new Vector3(0, 0, 0), new Vector3(10, 10, 0), new Vector3(200, 3, 0)]}*/}
            {/*             color={'blue'} width={5}/>*/}
            {/*<TextElement/>*/}
            <CanvasRenderer/>
            {/*<BoxElementMesh width={100} height={100} depth={0} position={[0, 0, 0]} color={'red'}/>*/}
            {/*<BoxElementMesh width={10} height={10} depth={0} position={[20, 20, 0]} color={'red'}/>*/}
            <GlobalEvents/>
        </>
    );
});