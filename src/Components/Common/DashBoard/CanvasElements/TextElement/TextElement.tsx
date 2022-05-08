import React, {Suspense} from "react";
import {Text} from '@react-three/drei';
import {DashBoardElementType} from "../../types";

export const TextElement: React.FC = () => {
    //Разобраться почему нет русских символов.
    return (
        <Suspense fallback={null}>
            <mesh type={DashBoardElementType.Text}>
                <Text position={[0, 0, 0]} fontSize={14} color={'black'}
                      characters="abcdefghijklmnopqrstuvwxyz0123456789!абвгдеёжзийклмнъопрстуфхцчшщъыьэюя">
                    hello world!
                </Text>
            </mesh>
        </Suspense>
    );
};