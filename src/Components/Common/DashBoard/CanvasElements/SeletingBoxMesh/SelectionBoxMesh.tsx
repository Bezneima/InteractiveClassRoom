import React, {Suspense, useRef} from "react";
import {observer} from "mobx-react-lite";
import * as THREE from "three";
import {Vector3} from "three";
import {DashBoardElementType} from "../../types";
import {SelectionBox} from "../../../../../Store/CanvasStore/types";
import {Edges} from "@react-three/drei";

export interface ISelectionBoxMesh {
    selectionBox: SelectionBox;
}

export const SelectionBoxMesh: React.FC<ISelectionBoxMesh> = observer(({selectionBox}) => {
    const mesh = useRef<THREE.Mesh>(null!);
    const {isSelecting} = selectionBox;
    if (selectionBox && isSelecting) {
        const {startV2, endV2, zIndex, owner, id} = selectionBox;
        const width = Math.abs(startV2.x - endV2.x);
        const height = Math.abs(startV2.y - endV2.y);
        const depth = zIndex;
        const position = new Vector3((endV2.x + startV2.x) / 2, (endV2.y + startV2.y) / 2, zIndex);
        const material = new THREE.PointsMaterial({color: "#0099ff", opacity: 0.2, transparent: true});

        return (
            <Suspense fallback={null}>
                <mesh key={id} ref={mesh} type={DashBoardElementType.Box} material={material} position={position}>
                    <boxGeometry args={[width, height, depth]}/>
                    <Edges color="#0099ff" />
                </mesh>
            </Suspense>
        );
    }
    return <></>
});