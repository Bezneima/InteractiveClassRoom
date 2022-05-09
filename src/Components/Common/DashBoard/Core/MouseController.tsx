import React, {useCallback, useEffect} from "react";
import {useThree} from "@react-three/fiber";
import {useCanvasStore} from "../../../../Store/hooks";
import {observer} from "mobx-react-lite";
import {Vector2} from "three";

export const MouseController = observer(() => {
    const canvasStore = useCanvasStore();
    const {camera, gl, mouse} = useThree();

    const pointerDown = useCallback(() => {
        canvasStore.setIsSelecting(true);
        canvasStore.selectionPointerDown(new Vector2(mouse.x * window.innerWidth / 2 + camera.position.x, mouse.y * window.innerHeight / 2 + camera.position.y));
    }, [camera, canvasStore, mouse]);

    const pointerMove = useCallback(() => {
        if (canvasStore.isSelecting) {
            canvasStore.selectionPointerMove(new Vector2(mouse.x * window.innerWidth / 2 + camera.position.x, mouse.y * window.innerHeight / 2 + camera.position.y));
        }
    }, [camera, canvasStore, mouse]);

    const pointerUp = useCallback(() => {
        canvasStore.setIsSelecting(false);
        canvasStore.selectionPointerUp(new Vector2(mouse.x * window.innerWidth / 2 + camera.position.x, mouse.y * window.innerHeight / 2 + camera.position.y));
    }, [camera, canvasStore, mouse]);


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
});