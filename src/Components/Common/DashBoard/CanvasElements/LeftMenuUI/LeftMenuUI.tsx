import React, {Suspense, useEffect, useRef} from "react";
import {Vector3} from "three";
import {useCanvasStore} from "../../../../../Store/hooks";
import {useThree} from "@react-three/fiber";
import {Html} from "@react-three/drei";
import {observer} from "mobx-react-lite";
import {Button, Col, Row} from "antd";
import {ECanvasMode} from "../../../../../Store/CanvasStore/types";


export const LeftMenuUI: React.FC = observer(() => {
    const paddingLeft = 10;
    const {camera} = useThree();
    const canvasStore = useCanvasStore();
    useEffect(() => {
    }, [canvasStore.cameraPosX, canvasStore.cameraPosY]);
    return (
        <Suspense fallback={null}>
            <mesh
                position={new Vector3(camera.position.x - window.innerWidth / 2 + paddingLeft, camera.position.y, 0)}>
                <Html>
                    <Row>
                        <Col span={24}>
                            <Button onClick={() => canvasStore.setCanvasMode(ECanvasMode.SelectMode)}>Выбирать</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button
                                onClick={() => canvasStore.setCanvasMode(ECanvasMode.CreateBoxMode)}>Создавать</Button>
                        </Col>
                    </Row>
                </Html>
            </mesh>
        </Suspense>
    )
});