import React, {useRef, useState, useMemo, useEffect, Suspense} from 'react'
import {BufferGeometry, Material, Mesh, MeshLambertMaterial, Vector2} from 'three';
import {SelectionBox} from 'three/examples/jsm/interactive/SelectionBox'
import {useThree} from "@react-three/fiber";
import {Geometry} from "three/examples/jsm/deprecated/Geometry";
import {DashBoardElementType} from "./types";
import * as THREE from "three";

type SelectionProps = {
    setSelecting: any;
    setStart: any;
    setEnd: any;
    setSelection: any;
    start: any;
    end: any;
    [x: string]: any;
}

type ThreeMesh = any;

export const Selection: React.FC<SelectionProps> = ({setSelecting, setStart, setEnd, setSelection, start, end}) => {
    /*
    const mesh = useRef<THREE.Mesh>(null!);
    const material = new THREE.PointsMaterial({color: 'green'});

    const {camera, scene, gl, mouse} = useThree();

    let selecting = useRef(false);
    let selectionBox = new SelectionBox(camera, scene);
    let selection = useRef<ThreeMesh[]>([]);
    let getCoords = (event: PointerEvent) => [(event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1];


    let appendSelection = (toAppend: ThreeMesh[]) => {
        selection.current = Array.from(new Set(selection.current.concat(toAppend)));
        setSelection(selection.current);
    }

    let pointerDown = (event: PointerEvent) => {
        let {clientX, clientY, altKey, ctrlKey} = event;
        if (!altKey && !selecting.current) {
            let [startX, startY] = getCoords(event);
            setStart(new Vector2(clientX, clientY));
            setSelecting(true);
            selecting.current = true;
            if (!ctrlKey) {
                console.log("resetting colors", event)
            }
            selectionBox.startPoint.set(startX, startY, 0.5);
            selectionBox.endPoint.set(startX, startY, 0.5);
            console.log('Начал выделять');
        }
    }
    let pointerMove = (event: PointerEvent) => {
        if (selecting.current) {
            let {clientX, clientY} = event;
            let [endX, endY] = getCoords(event);
            setEnd(new Vector2(clientX, clientY));
            selectionBox.select();
            //setColors(selectionBox.collection, 0x000000);

            selectionBox.endPoint.set(endX, endY, 0.5);
            selectionBox.select();

            console.log('Выделяю');
        }
    }
    let pointerUp = (event: PointerEvent) => {
        if (selecting.current || !event.button) {
            setSelecting(false);
            selecting.current = false;
            let {ctrlKey} = event;

            let [endX, endY] = getCoords(event);
            selectionBox.endPoint.set(endX, endY, 0.5);
            console.log(selectionBox.startPoint, selectionBox.endPoint, selectionBox);
            let curSelected = selectionBox.select();
            console.log('curSelected', curSelected);
            setEnd(null);
            setStart(null);

            if (ctrlKey) {
                appendSelection(curSelected)
            } else {
                setSelection(curSelected)
                selection.current = curSelected
            }
            console.log('Закончил выделять');
        }
    }

    useEffect(() => {
        gl.domElement.onpointermove = pointerMove;
        gl.domElement.onpointerup = pointerUp;
        gl.domElement.onpointerdown = pointerDown;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log();
    return (
        <Suspense fallback={null}>
            {
                start && end &&
                <mesh ref={mesh} type={DashBoardElementType.Box} material={material}
                      position={[
                          (end.x - start.x) / 2 + camera.position.x,
                          (start.y - end.y) / 2 + camera.position.y,
                          0.5
                      ]}>
                    <boxGeometry args={[end.x - start.x, end.y - start.y, 0.5]}/>
                </mesh>
            }
        </Suspense>
    );

     */
    return <></>
}