import React, {Suspense} from "react";
import * as THREE from "three";

export const Sprite = (props: JSX.IntrinsicElements['mesh']) => {
    const material = new THREE.SpriteMaterial({color: 'red'});
    return (
        <Suspense fallback={null}>
            <sprite position={props.position} scale={props.scale} material={material}/>
        </Suspense>
    )
}