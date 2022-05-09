import * as THREE from "three";
import React, {Suspense, useEffect, useRef} from "react";
import {Vector3} from "@react-three/fiber";
import {DashBoardElementType} from "../../types";
import {useCanvasStore} from "../../../../../Store/hooks";
import {observer} from "mobx-react-lite";

export type TBox = {
    id: number;
    width: number;
    height: number;
    depth: number;
    position: Vector3;
    color: string;
}

export const BoxElementMesh: React.FC<TBox> = observer(({id, width, height, depth, position, color}) => {
    const canvasStore = useCanvasStore();
    const me = canvasStore.renderedElements.find(elem => elem.id === id);
    useEffect(() => {
        if (me) {
            console.log('Я изменился', me, me.isSelected);
        }
    }, [me, canvasStore.renderedElements]);
    const mesh = useRef<THREE.Mesh>(null!)
    if (me) {
        const material = new THREE.PointsMaterial({color: me.isSelected ? '#FFF000' : color});
        return (
            <Suspense fallback={null}>
                <mesh ref={mesh} type={DashBoardElementType.Box} material={material} position={position}>
                    <boxGeometry args={[width, height, depth]}/>
                </mesh>
            </Suspense>
        );
    }
    return <></>
});