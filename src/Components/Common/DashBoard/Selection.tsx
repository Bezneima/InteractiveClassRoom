import React, { useRef, useState, useMemo, useEffect } from 'react'
import { BufferGeometry, Material, Mesh, MeshLambertMaterial, Vector2 } from 'three';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox'
import {useThree} from "@react-three/fiber";
import {Geometry} from "three/examples/jsm/deprecated/Geometry";

type SelectionProps = {
    setSelecting: any;
    setStart: any;
    setEnd: any;
    setSelection: any;
    [x: string]: any;
}

type ThreeMesh = any;

export const Selection = ({ setSelecting, setStart, setEnd, setSelection }: SelectionProps) => {
    const { camera, scene, gl } = useThree();

    let selecting = useRef(false);
    let selectionBox = new SelectionBox(camera, scene);
    let selection = useRef<ThreeMesh[]>([]);
    let getCoords = (event: PointerEvent) => [(event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1];

    let setColors = (collection: ThreeMesh[], color: number) => {
        for (let item of collection ) {
            if (item.material) {
                let material = item.material as MeshLambertMaterial;
                material.emissive.set(color)
            }
        }
    }

    let appendSelection = (toAppend: ThreeMesh[]) => {
        selection.current = Array.from(new Set(selection.current.concat(toAppend)));
        setSelection(selection.current);
    }

    let pointerDown = (event: PointerEvent) => {
        let { clientX, clientY, altKey, ctrlKey } = event;
        if (!altKey && !selecting.current) {
            let [startX, startY] = getCoords(event);
            setStart(new Vector2(clientX, clientY));
            setSelecting(true);
            selecting.current = true;
            if (!ctrlKey) {
                console.log("resetting colors", event)
                //setColors(selection.current, 0x000000);
            }
            selectionBox.startPoint.set(startX, startY, 0.5);
            selectionBox.endPoint.set(startX, startY, 0.5);
        }
    }
    let pointerMove = (event: PointerEvent) => {
        if (selecting.current) {
            let { clientX, clientY } = event;
            let [endX, endY] = getCoords(event);
            setEnd(new Vector2(clientX, clientY));
            selectionBox.select();
            //setColors(selectionBox.collection, 0x000000);

            selectionBox.endPoint.set(endX, endY, 0.5);
            selectionBox.select();

            //setColors(selectionBox.collection, 0xffffff);
        }
    }
    let pointerUp = (event: PointerEvent) => {
        if (selecting.current || !event.button) {
            setSelecting(false);
            selecting.current = false;
            let { ctrlKey } = event;

            let [endX, endY] = getCoords(event);
            selectionBox.endPoint.set(endX, endY, 0.5);
            let curSelected = selectionBox.select();

            setEnd(null);
            setStart(null);

            if (ctrlKey) {
                appendSelection(curSelected)
            } else {
                setSelection(curSelected)
                selection.current = curSelected
            }

            //setColors(selectionBox.collection, 0xffffff);
        }
    }

    useEffect(() => {
        gl.domElement.onpointermove = pointerMove;
        gl.domElement.onpointerup = pointerUp;
        gl.domElement.onpointerdown = pointerDown;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
}