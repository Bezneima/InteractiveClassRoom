import React, {useCallback, useEffect, useRef, useState} from "react";
import {useThree} from "@react-three/fiber";
import {Mesh, PointsMaterial} from "three";
import {selectionPointerDown, selectionPointerMove, selectionPointerUp} from "./MouseService/MouseService";
import {useCanvasDispatch, useCanvasState} from "../../Context/CanvasContext/CanvasContext";

export const MouseController = () => {
    const state = useCanvasState();
    console.log('Внутри мышки', state.mode);
    const dashBoardDispatch = useCanvasDispatch();
    const mesh = useRef<Mesh>(null!);
    const material = new PointsMaterial({color: 'green'});
    const {camera, gl, mouse} = useThree();
    //Этот реф нужен, тк события глобальные и внутри них будет такой-же как при создании значение.
    const isSelecting = useRef(false);

    const pointerDown = useCallback(() => {
        isSelecting.current = true;
        selectionPointerDown(dashBoardDispatch, mouse, camera, state);
    }, [camera, dashBoardDispatch, mouse, state]);

    const pointerMove = useCallback(() => {
        if (isSelecting && isSelecting.current) {
            selectionPointerMove(dashBoardDispatch, mouse, camera, state);
        }
    }, [camera, dashBoardDispatch, mouse, state]);

    const pointerUp = useCallback(() => {
        isSelecting.current = false;
        selectionPointerUp(dashBoardDispatch, mouse, camera, state);
    }, [camera, dashBoardDispatch, mouse, state]);


    useEffect(() => {
        //Вот это конечно пиздец, я не знаю как бы это убрать.
        gl.domElement.addEventListener('pointermove', pointerMove);
        gl.domElement.addEventListener('pointerup', pointerUp);
        gl.domElement.addEventListener('pointerdown', pointerDown);
        return () => {
            gl.domElement.removeEventListener('pointermove', pointerMove);
            gl.domElement.removeEventListener('pointerup', pointerUp);
            gl.domElement.removeEventListener('pointerdown', pointerDown);
        }
    }, [gl.domElement, pointerDown, pointerMove, pointerUp]);

    return <></>;
    // Это нужно потом отрисовать в объектах
    /*
    return (
        <Suspense fallback={null}>
            {selection.startV2 && selection.endV2 && selection.isSelecting &&
                <mesh ref={mesh} type={DashBoardElementType.Box} material={material}
                      position={[
                          (selection.endV2.x + selection.startV2.x) / 2,
                          (selection.endV2.y + selection.startV2.y) / 2,
                          0.5
                      ]}>
                    <boxGeometry
                        args={[selection.endV2.x - selection.startV2.x, selection.endV2.y - selection.startV2.y, 0.5]}/>
                </mesh>
            }
        </Suspense>
    );
     */
};