import * as THREE from "three";
import React, {Suspense, useEffect, useRef, useState} from "react";
import {DashBoardElementType} from "../../types";
import {useCanvasStore} from "../../../../../Store/hooks";
import {observer} from "mobx-react-lite";
import {BoxElement} from "../../../../../Store/CanvasStore/types";
import {Vector3} from "three";

export type TBox = { id: number; }

export const BoxElementMesh: React.FC<TBox> = observer(({id}) => {
    const canvasStore = useCanvasStore();
    const mesh = useRef<THREE.Mesh>(null!);
    const [state, setState] = useState<BoxElement>();
    // он обновляет эту залупу потому что тут он что-то делает с canvasStore.renderedElements;
    //const me1 = canvasStore.renderedElements.find(elem => elem.id === id) as BoxElement;
    const me = canvasStore.renderedElementsMap[id] as BoxElement;
    useEffect(() => {
        if (me) {
            setState(me);
        }
    }, [canvasStore.renderedElementsMap, me]);
    if (state) {
        //const {startV2, endV2, zIndex, isSelected, color} = me;
        console.log(state, state.startV2, state.endV2);
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