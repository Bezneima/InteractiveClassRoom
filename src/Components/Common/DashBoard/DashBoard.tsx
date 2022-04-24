import React, {useState} from 'react'
import {Canvas} from '@react-three/fiber'

import {Box} from "./Box/Box";
import {Camera} from "./Camera/Camera";
import {Selection} from "./Selection";
import {Line} from "@react-three/drei";
import {Vector3} from "three";


export const DashBoard = () => {
    const [isSelecting, setSelecting] = useState();
    const [selectingStart, setSelectingStart] = useState();
    const [selectingEnd, setSelectingEnd] = useState();
    const [selection, setSelection] = useState();
    console.log(selection);
    const points = [new Vector3(0,0,0),new Vector3(10,10,0),new Vector3(200,3,0)];
    return <>

        <Canvas
            resize={{scroll: false}}
            orthographic
            style={{width: '100wh', height: '100vh'}}
        >
                <Camera/>
                <ambientLight color="#fff" intensity={1}/>
                <Line key={1} points={points} color="black" dashScale={5}/>
                {/*<Sprite position={[0, 0, 0]}/>*/}
                {/*<Text position={[0, 0, 1]} color={'black'} fontSize={14} characters="abcdefghijklmnopqrstuvwxyz0123456789!">*/}
                {/*    hello world!asd*/}
                {/*</Text>*/}
                <Selection setSelecting={setSelecting} setStart={setSelectingStart} setEnd={setSelectingEnd} setSelection={setSelection} />

                <Box width={10} height={10} depth={0} position={[0, 0, 0]} color={'red'}/>
                <Box width={10} height={10} depth={0} position={[20, 20, 0]} color={'red'}/>
        </Canvas>

    </>
};
