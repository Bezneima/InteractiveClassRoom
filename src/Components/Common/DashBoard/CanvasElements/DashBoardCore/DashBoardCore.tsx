import React from "react";
import {Canvas} from "@react-three/fiber";
import {RootStoreProvider} from "../../../../../Store/createStore";
import {CanvasScene} from "../CanvasScene/CanvasScene";

export const DashBoardCore: React.FC = () => {
    //const dashBoardDispatch = useDispatch(DashBoardDispatchContext);

    /*
    const onSelectModeClick = useCallback(() => {
        dashBoardDispatch({type: "SetSelectMode"});
    }, [dashBoardDispatch]);

    const onCreateBoxModeClick = useCallback(() => {
        dashBoardDispatch({type: "SetCreateBoxMode"});
    }, [dashBoardDispatch]);
     */


    return (
        <>
            {/*<div style={{position: 'absolute', zIndex: 5}}>*/}
            {/*    <Button onClick={onSelectModeClick}>Select</Button>*/}
            {/*    <Button onClick={onCreateBoxModeClick}>CreateBox</Button>*/}
            {/*</div>*/}
            <Canvas
                resize={{scroll: false}}
                orthographic
                style={{width: '100wh', height: '100vh', zIndex: 0}}
            >
                {/*<ContextBridge>*/}
                <RootStoreProvider>
                    <CanvasScene/>
                </RootStoreProvider>
                {/*</ContextBridge>*/}
            </Canvas>
        </>
    );
}