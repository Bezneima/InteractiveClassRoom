import React, {Suspense} from "react";
import {Line} from "@react-three/drei";
import {Vector3} from "three";
import {DashBoardElementType} from "../../types";

export interface ILine {
    points: Array<Vector3 | [number, number, number]>;
    width: number;
    color: string;
}


export const LineElement: React.FC<ILine> = ({points, width, color}) => {
    return (
        <Suspense fallback={null}>
            <mesh type={DashBoardElementType.Line}>
                <Line key={1} points={points} color={color} dashScale={width}/>
            </mesh>
        </Suspense>
    );
};