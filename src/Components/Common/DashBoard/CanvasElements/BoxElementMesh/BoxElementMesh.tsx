import * as THREE from "three";
import React, {Suspense, useRef, useState} from "react";
import {DashBoardElementType} from "../../types";
import {observer} from "mobx-react-lite";
import {BoxElement} from "../../../../../Store/CanvasStore/types";
import {Vector3} from "three";
import {Text} from '@react-three/drei';

export type TBoxElementMesh = { boxElement: BoxElement; }

export const BoxElementMesh: React.FC<TBoxElementMesh> = observer(({boxElement}) => {
    const mesh = useRef<THREE.Mesh>(null!);

    if (boxElement) {
        const {startV2, endV2, zIndex, isSelected, color, id} = boxElement;
        const width = Math.abs(startV2.x - endV2.x);
        const height = Math.abs(startV2.y - endV2.y);

        const position = new Vector3((endV2.x + startV2.x) / 2, (endV2.y + startV2.y) / 2, zIndex);
        const material = new THREE.PointsMaterial({color: isSelected ? '#FFF000' : color});

        return (
            <Suspense fallback={null}>
                <group key={id} position={position}>
                    <mesh ref={mesh} type={DashBoardElementType.Box} material={material}>
                        <boxGeometry args={[width, height, 0]}/>
                    </mesh>
                    <Text
                        fontSize={14}
                        color={'black'}
                        depthOffset={-0.01}
                        characters="abcdefghijklmnopqrstuvwxyz0123456789!абвгдеёжзийклмнъопрстуфхцчшщъыьэюя">
                        {id}
                    </Text>
                </group>
            </Suspense>
        );
    }
    return <></>
});