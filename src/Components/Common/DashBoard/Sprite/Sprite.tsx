import React, {useRef, useState} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";

export const Sprite = (props: JSX.IntrinsicElements['mesh']) => {
    const material = new THREE.SpriteMaterial( { color: 'red' } );
    return (
        <sprite position={props.position} scale={props.scale} material={material}/>
    )
}