import * as THREE from "three";
import React, {Suspense, useRef} from "react";
import {DashBoardElementType} from "../../types";
import {observer} from "mobx-react-lite";
import {BoxElement} from "../../../../../Store/CanvasStore/types";
import {Vector3} from "three";
import {toJS} from "mobx";

export type TBox = { boxElement: BoxElement; }

export const BoxElementMesh: React.FC<TBox> = observer(({boxElement}) => {
    const mesh = useRef<THREE.Mesh>(null!);

    if (boxElement) {
        console.log(toJS(boxElement), boxElement.id);
        const {startV2, endV2, zIndex, isSelected, color, id} = boxElement;
        const width = Math.abs(startV2.x - endV2.x);
        const height = Math.abs(startV2.y - endV2.y);
        const depth = zIndex;
        const position = new Vector3((endV2.x + startV2.x) / 2, (endV2.y + startV2.y) / 2, zIndex);
        const material = new THREE.PointsMaterial({color: isSelected ? '#FFF000' : color});

        return (
            <Suspense fallback={null}>
                <mesh key={id} ref={mesh} type={DashBoardElementType.Box} material={material} position={position}>
                    <boxGeometry args={[width, height, depth]}/>
                </mesh>
            </Suspense>
        );
    }
    return <></>
});