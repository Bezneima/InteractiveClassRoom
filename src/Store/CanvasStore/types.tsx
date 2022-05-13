import React from "react";
import {Vector2} from "three";

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
    public type: ERenderedElementType;
    public startV2: Vector2;
    public endV2: Vector2;
    public zIndex: number;
    public isSelected = true;

    protected constructor(id: number, type: ERenderedElementType, startV2: Vector2, endV2: Vector2, zIndex: number) {
        this.id = id;
        this.type = type;
        this.startV2 = startV2;
        this.endV2 = endV2;
        this.zIndex = zIndex;
    }

}

export class BoxElement extends RenderedElement {
    public color: string;

    constructor(id: number, startV2: Vector2, endV2: Vector2, zIndex: number, color: string = '#00FF00') {
        super(id, ERenderedElementType.Box, startV2, endV2, zIndex);
        //console.log('Конструктор', startV2, endV2);
        this.color = color;
    }

}

// подумать нужно ли это вообще, просто не хочется искать по всем элементам у каждго элемента который рендерится обновлиась ли инфа или нет блять.
export type TRenderedElementsMap = { [key: number]: { indexInArray: number, value: RenderedElement } };