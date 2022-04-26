import React, {Suspense, useCallback, useEffect, useRef, useState} from "react";
import {DashBoardElementType} from "../types";
import * as THREE from "three";
import {useThree} from "@react-three/fiber";
import {Vector2} from "three";

export const NewSelection: React.FC = () => {
    const mesh = useRef<THREE.Mesh>(null!);
    const material = new THREE.PointsMaterial({color: 'green'});
    const {camera, scene, gl, mouse} = useThree();
    const [start, setStart] = useState<THREE.Vector2>();
    const [end, setEnd] = useState<THREE.Vector2>();
    const isSelecting = useRef(false);

    let pointerDown = useCallback(() => {
        isSelecting.current = true;
        setStart(new Vector2(mouse.x * window.innerWidth/2 + camera.position.x, mouse.y * window.innerHeight/2 + camera.position.y));
    },[camera.position.x, camera.position.y, mouse.x, mouse.y]);

    let pointerMove = useCallback(() => {
        if(isSelecting) {
            setEnd(new Vector2(mouse.x * window.innerWidth / 2 + camera.position.x, mouse.y * window.innerHeight / 2 + camera.position.y));
        }
    },[camera.position.x, camera.position.y, isSelecting, mouse.x, mouse.y]);

    let pointerUp = () => {
        isSelecting.current = false;
        setStart(new Vector2(mouse.x * window.innerWidth/2 + camera.position.x, mouse.y * window.innerHeight/2 + camera.position.y));
        //console.log(clientX, clientY);
    }


    useEffect(() => {
        gl.domElement.onpointermove = pointerMove;
        gl.domElement.onpointerup = pointerUp;
        gl.domElement.onpointerdown = pointerDown;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Suspense fallback={null}>
            {start && end && isSelecting.current &&
                <mesh ref={mesh} type={DashBoardElementType.Box} material={material}
                      position={[
                          (end.x + start.x) / 2,
                          (end.y + start.y) / 2,
                          0.5
                      ]}>
                    <boxGeometry args={[end.x - start.x, end.y - start.y, 0.5]}/>
                </mesh>
            }
        </Suspense>
    );
};
