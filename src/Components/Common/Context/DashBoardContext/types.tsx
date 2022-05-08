import React, {Context} from "react";
import {Vector2, Vector3} from "three";
import {BoxElementMesh, TBox} from "../../DashBoard/CanvasElements/BoxElementMesh/BoxElementMesh";

export type DashBoardProviderProps = {
    children: React.ReactNode
}

export type TDashBoardDispatch = (action: TDashBoardAction) => void


export type TDashBoardAction = TDashBoardChangeModeActions;//Тут добавлять возможные экшены
export type TDashBoardChangeModeActions = { type: '' };


export type TDashBoardState = {}
