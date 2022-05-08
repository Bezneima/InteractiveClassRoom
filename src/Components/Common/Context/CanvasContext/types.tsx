import React, {Context} from "react";
import {Vector2, Vector3} from "three";
import {BoxElementMesh, TBox} from "../../DashBoard/CanvasElements/BoxElementMesh/BoxElementMesh";

export type CanvasProviderProps = {
    children: React.ReactNode,
}
export type TCanvasDispatch = (action: TCanvasAction) => void;

export type TCanvasAction = TCanvasChangeModeActions | TCanvasSelectionActions | TCanvasCreateElementAction;//Тут добавлять возможные экшены
export type TCanvasChangeModeActions = { type: 'SetSelectMode' | 'SetCreateBoxMode' };
export type TCanvasSelectionActions = { type: 'SelectingPointerDown' | 'SelectingPointerUp' | 'SelectingPointerMove', value: TSelection };
export type TCanvasCreateElementAction = { type: 'AddElement', value: RenderedElement };

export type TCanvasState = {
    mode: ECanvasMode,
    selection: TSelection
    renderedElements: Array<RenderedElement>;
}

export type TSelection = {
    isSelecting?: boolean;
    startV2?: Vector2;
    endV2?: Vector2;
};

export enum ERenderedElementType {
    Box = 'Box',
    Line = 'Line',
    Text = 'Text',
}

export enum ECanvasMode {
    SelectMode,
    CreateBoxMode
}

export abstract class RenderedElement {
    protected _type: ERenderedElementType;
    private _startV2: Vector2;
    private _endV2: Vector2;
    private _zIndex: number;
    private _isSelected = true;

    protected constructor(type: ERenderedElementType, startV2: Vector2, endV2: Vector2, zIndex: number) {
        this._type = type;
        this._startV2 = startV2;
        this._endV2 = endV2;
        this._zIndex = zIndex;
    }

    get type(): ERenderedElementType {
        return this._type;
    }

    get startV2(): Vector2 {
        return this._startV2;
    }

    set startV2(value: Vector2) {
        this._startV2 = value;
    }

    get endV2(): Vector2 {
        return this._endV2;
    }

    set endV2(value: Vector2) {
        this._endV2 = value;
    }

    get zIndex(): number {
        return this._zIndex;
    }

    set zIndex(value: number) {
        this._zIndex = value;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        this._isSelected = value;
    }
}

export class BoxElement extends RenderedElement {
    _color: string;
    public _mesh: JSX.Element;

    constructor(startV2: Vector2, endV2: Vector2, zIndex: number, color: string = '#FF0000') {
        super(ERenderedElementType.Box, startV2, endV2, zIndex);
        this._color = color;
        this._mesh = <BoxElementMesh
            width={Math.abs(startV2.x - endV2.x)}
            height={Math.abs(startV2.y - endV2.y)}
            depth={zIndex}
            position={new Vector3((endV2.x + startV2.x) / 2, (endV2.y + startV2.y) / 2, zIndex)}
            color={color}/>;
    }

    public set color(color: string) {
        this._color = color;
    }

    set mesh(props: TBox) {
        this._mesh = <BoxElementMesh {...props}/>;
    }

}