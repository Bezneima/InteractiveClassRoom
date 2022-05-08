import {Canvas} from "@react-three/fiber";
import React from "react";
import {useContextBridge} from "@react-three/drei";
import {CanvasScene} from "../CanvasScene/CanvasScene";
import {DashBoardDispatchContext, DashBoardStateContext} from "../../../Context/Contexts";
import {CanvasProvider} from "../../../Context/CanvasContext/CanvasContext";

export const CanvasRenderer = () => {
    const ContextBridge = useContextBridge(DashBoardStateContext, DashBoardDispatchContext);
    return (
        <Canvas
            resize={{scroll: false}}
            orthographic
            style={{width: '100wh', height: '100vh', zIndex: 0}}
        >
            <ContextBridge>
                <CanvasProvider>
                    <CanvasScene/>
                </CanvasProvider>
            </ContextBridge>
        </Canvas>

    );
}