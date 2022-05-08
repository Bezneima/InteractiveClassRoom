import * as THREE from "three";
import React, {Suspense, useRef} from "react";
import {Vector3} from "@react-three/fiber";
import {DashBoardElementType} from "../../types";

export type TBox = {
    width: number;
    height: number;
    depth: number;
    position: Vector3;
    color: string;
}

export const BoxElementMesh: React.FC<TBox> = ({width, height, depth, position, color}) => {
    const mesh = useRef<THREE.Mesh>(null!)
    const material = new THREE.PointsMaterial({color: color});
    return (
        <Suspense fallback={null}>
            <mesh ref={mesh} type={DashBoardElementType.Box} material={material} position={position}>
                <boxGeometry args={[width, height, depth]}/>
            </mesh>
        </Suspense>
    );
}