import React, {useState} from 'react'
import {Canvas} from '@react-three/fiber'

import {BoxElement} from "./Elements/BoxElement/BoxElement";
import {Camera} from "./Camera/Camera";
import {Selection} from "./Selection";
import {Line} from "@react-three/drei";
import {Vector3} from "three";
import {LineElement} from "./Elements/LineElement/LineElement";
import {TextElement} from "./Elements/TextElement/TextElement";
import {NewSelection} from "./utils/NewSelection";


export const DashBoard = () => {
    const [isSelecting, setSelecting] = useState();
    const [selectingStart, setSelectingStart] = useState();
    const [selectingEnd, setSelectingEnd] = useState();
    const [selection, setSelection] = useState();

    const points = [new Vector3(0, 0, 0), new Vector3(10, 10, 0), new Vector3(200, 3, 0)];
    return <>

        <Canvas
            resize={{scroll: false}}
            orthographic
            style={{width: '100wh', height: '100vh'}}
        >
            <Camera/>
            <ambientLight color="#fff" intensity={1}/>
            <LineElement points={points} color={'blue'} width={5}/>

            <NewSelection/>
            {/*<Selection*/}
            {/*    start={selectingStart}*/}
            {/*    end={selectingEnd}*/}
            {/*    setSelecting={setSelecting}*/}
            {/*    setStart={setSelectingStart}*/}
            {/*    setEnd={setSelectingEnd}*/}
            {/*    setSelection={setSelection}/>*/}
            <TextElement/>
            <BoxElement width={10} height={10} depth={0} position={[0, 0, 0]} color={'red'}/>
            <BoxElement width={10} height={10} depth={0} position={[20, 20, 0]} color={'red'}/>
        </Canvas>

    </>
};
