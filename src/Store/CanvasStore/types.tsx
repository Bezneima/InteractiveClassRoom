import React from "react";
import {Vector2} from "three";
import {makeAutoObservable, makeObservable, observable} from "mobx";

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
        makeObservable(this, {
            type: observable,
            endV2: observable,
            startV2: observable,
            zIndex: observable,
            isSelected: observable,
        });
    }

}

export class BoxElement extends RenderedElement {
    public color: string;

    constructor(id: number, startV2: Vector2, endV2: Vector2, zIndex: number, color: string = '#00FF00') {
        super(id, ERenderedElementType.Box, startV2, endV2, zIndex);
        //console.log('Конструктор', startV2, endV2);
        this.color = color;
        makeObservable(this, {
            color: observable,
        });
    }

}

// подумать нужно ли это вообще, просто не хочется искать по всем элементам у каждго элемента который рендерится обновлиась ли инфа или нет блять.
export type TRenderedElementsMap = { [key: number]: { indexInArray: number, value: RenderedElement } };


export class SelectionBox {
    public id: string;
    public owner: string;
    public startV2: Vector2;
    public endV2: Vector2;
    public zIndex: number;
    public isSelecting: boolean;

    constructor(id: string, owner: string, startV2: Vector2, endV2: Vector2, zIndex: number, isSelecting: boolean) {
        this.id = id;
        this.owner = owner;
        this.startV2 = startV2;
        this.endV2 = endV2;
        this.zIndex = zIndex;
        this.isSelecting = isSelecting;
        makeObservable(this, {
            owner: observable,
            startV2: observable,
            endV2: observable,
            zIndex: observable,
            isSelecting: observable,
        });
    }

}