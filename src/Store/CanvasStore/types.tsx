import React, {Context} from "react";
import {Vector2, Vector3} from "three";
import {BoxElementMesh} from "../../Components/Common/DashBoard/CanvasElements/BoxElementMesh/BoxElementMesh";

export type TCanvasStore = {
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
    public id: number;
    protected _type: ERenderedElementType;
    protected _startV2: Vector2;
    protected _endV2: Vector2;
    protected _zIndex: number;
    protected _isSelected = true;

    protected constructor(id: number, type: ERenderedElementType, startV2: Vector2, endV2: Vector2, zIndex: number) {
        this.id = id;
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
        //console.log(`Я устанавливаю endV2 ${this.id}`, this);
        this._endV2 = value;
    }

    get zIndex(): number {
        return this._zIndex;
    }

    set zIndex(value: number) {
        this._zIndex = value;
    }

    get isSelected(): boolean {
        //console.log(`беру у BOX ${this.id} isSelected: ${this._isSelected}`);
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        //console.log(`Изменил у BOX ${this.id} isSelected на ${value}`);
        this._isSelected = value;
    }

}

export class BoxElement extends RenderedElement {
    private _color: string;
    private _mesh: JSX.Element;

    constructor(id: number, startV2: Vector2, endV2: Vector2, zIndex: number, color: string = '#00FF00') {
        super(id, ERenderedElementType.Box, startV2, endV2, zIndex);
        console.log('Конструктор', startV2, endV2);
        this._color = color;

        this._zIndex = zIndex;
        this._startV2 = startV2;
        this._endV2 = endV2;

        this._mesh = <BoxElementMesh id={this.id} />;
    }

    get mesh(): JSX.Element {
        return this._mesh;
    }

    set mesh(value: JSX.Element) {
        this._mesh = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

}
// подумать нужно ли это вообще, просто не хочется искать по всем элементам у каждго элемента который рендерится обновлиась ли инфа или нет блять.
export type TRenderedElementsMap = { [key: number]: RenderedElement };