import React from "react";
import {Camera} from "../../Camera/Camera";
import {BoxElementMesh} from "../BoxElementMesh/BoxElementMesh";

export const CanvasScene: React.FC = () => {
    // ! Этот контекст из вне canvas, использовать редко тк он ререндерит весь canvas.
    //const dashboardState = React.useContext(DashBoardStateContext);
    //const dashBoardDispatch = React.useContext(DashBoardDispatchContext);

    return (
        <>
            {/*<MouseController/>*/}
            <Camera/>
            <ambientLight color="#fff" intensity={1}/>
            {/*<Selection dashBoardDispatch={dashBoardDispatch} selection={selection}/>*/}

            {/*<LineElement points={[new Vector3(0, 0, 0), new Vector3(10, 10, 0), new Vector3(200, 3, 0)]}*/}
            {/*             color={'blue'} width={5}/>*/}
            {/*<TextElement/>*/}
            <BoxElementMesh width={100} height={100} depth={0} position={[0, 0, 0]} color={'red'}/>
            {/*<BoxElementMesh width={10} height={10} depth={0} position={[20, 20, 0]} color={'red'}/>*/}
        </>
    );
}