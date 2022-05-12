import * as THREE from "three";
import React, {Suspense, useEffect, useRef, useState} from "react";
import {DashBoardElementType} from "../../types";
import {useCanvasStore} from "../../../../../Store/hooks";
import {observer} from "mobx-react-lite";
import {BoxElement} from "../../../../../Store/CanvasStore/types";
import {Vector3} from "three";
import {toJS} from "mobx";

export type TBox = { id: number; }

export const BoxElementMesh: React.FC<TBox> = observer(({id}) => {
    console.log('Мой ид:', id);
    const canvasStore = useCanvasStore();
    const mesh = useRef<THREE.Mesh>(null!);
    const [state, setState] = useState<BoxElement>();
    const me = canvasStore.renderedElementsMap[id];
    useEffect(() => {
        if (me) {
            setState(me.value as BoxElement);
        }
    }, [canvasStore.renderedElementsMap, id, me]);

    if (state) {
        const width = Math.abs(state.startV2.x - state.endV2.x);
        const height = Math.abs(state.startV2.y - state.endV2.y);
        const depth = state.zIndex;
        const position = new Vector3((state.endV2.x + state.startV2.x) / 2, (state.endV2.y + state.startV2.y) / 2, state.zIndex);
        const material = new THREE.PointsMaterial({color: state.isSelected ? '#FFF000' : state.color});

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