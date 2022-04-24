import * as THREE from "three";
import React, {useRef} from "react";
import {Vector3} from "@react-three/fiber";

export type TBox = {
    width: number;
    height: number;
    depth: number;
    position: Vector3;
    color: string;
}

export const Box: React.FC<TBox> = ({width, height, depth, position, color}) => {
    const mesh = useRef<THREE.Mesh>(null!)
    const material = new THREE.PointsMaterial({color: color});
    return (
        <mesh ref={mesh} type={'MYBOX'} material={material} position={position}>
            <boxGeometry args={[width, height, depth]}/>
        </mesh>
    );
}