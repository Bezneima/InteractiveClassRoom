import {useThree} from "@react-three/fiber";
import React, {useCallback, useEffect, useRef, useState} from "react";


type CameraPos = {
    x: number;
    y: number;
    zoom: number;
}

export const Camera = () => {
    const cameraPos = useRef<CameraPos>({x: 0, y: 0, zoom: 1})
    const {camera} = useThree();

    const render = useCallback(() => {
        camera.position.set(cameraPos.current.x, cameraPos.current.y, 1);
        camera.zoom = cameraPos.current.zoom;
        camera.updateProjectionMatrix();
    }, [camera])

    const windowOnWheelListener = useCallback((e) => {
        if (e.ctrlKey) {
            cameraPos.current.zoom -= e.deltaY * 0.01;
            if (cameraPos.current.zoom < 1) cameraPos.current.zoom = 1;
        } else {
            cameraPos.current.x -= e.deltaX * 0.5;
            cameraPos.current.y -= e.deltaY * 0.5;
        }
        render();
    }, [render]);

    const documentOnWheelListener = useCallback((e) => {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, []);

    useEffect(() => {
        document.addEventListener(
            'wheel',
            documentOnWheelListener,
            {passive: false}
        );
        window.addEventListener('wheel', windowOnWheelListener);
        return () => {
            document.removeEventListener('wheel', documentOnWheelListener);
            window.removeEventListener('wheel', windowOnWheelListener);
        };
    }, [cameraPos, windowOnWheelListener, render, documentOnWheelListener]);

    return <></>;
};