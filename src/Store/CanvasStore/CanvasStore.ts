import {action, makeAutoObservable, observable} from "mobx";
import {ECanvasMode, RenderedElement, TRenderedElementsMap, TSelection} from "./types";
import {Vector2} from "three";
import {createBox} from "../../Components/Common/DashBoard/Core/CreateElementService/CreateElementService";
import {ECreationsStages} from "../../Components/Common/DashBoard/Core/CreateElementService/types";

export default class CanvasStore {
    mode: ECanvasMode = ECanvasMode.SelectMode;
    canvasWidth: number;
    canvasHeight: number;
    cameraPosX: number;
    cameraPosY: number;
    selection?: TSelection;
    isSelecting: boolean = false;
    isMoved: boolean = false;
    selectedElements = observable<RenderedElement>([])
    renderedElements = observable<RenderedElement>([]);
    renderedElementsMap: TRenderedElementsMap = {};

    constructor() {
        makeAutoObservable(this);
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
        this.cameraPosX = 0;
        this.cameraPosY = 0;
    }

    @action.bound
    onInnerWindowSizeChange() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;
    }

    @action.bound
    onCameraMove(cameraPosX: number, cameraPosY: number) {
        this.cameraPosX = cameraPosX;
        this.cameraPosY = cameraPosY;
    }

    @action.bound
    setCanvasMode(newMode: ECanvasMode) {
        this.mode = newMode;
    }

    @action.bound
    setIsSelecting(isSelecting: boolean) {
        this.isSelecting = isSelecting;
    }

    @action.bound
    selectionPointerDown(mouse: Vector2) {
        this.isMoved = false;
        switch (this.mode) {
            case ECanvasMode.SelectMode:
                console.log('Селектид элемент', this.selectedElements);
                break;
            case ECanvasMode.CreateBoxMode:
                createBox(ECreationsStages.start, this.renderedElementsMap, this.renderedElements, this.selectedElements, mouse);
                break;
        }
    }

    @action.bound
    selectionPointerMove(mouse: Vector2) {
        this.isMoved = true;
        switch (this.mode) {
            case ECanvasMode.SelectMode:
                break;
            case ECanvasMode.CreateBoxMode:
                createBox(ECreationsStages.move, this.renderedElementsMap, this.renderedElements, this.selectedElements, mouse);
                break;
        }
    }

    @action.bound
    selectionPointerUp(mouse: Vector2) {
        switch (this.mode) {
            case ECanvasMode.SelectMode:
                break;
            case ECanvasMode.CreateBoxMode:
                createBox(ECreationsStages.end, this.renderedElementsMap, this.renderedElements, this.selectedElements, mouse, this.isMoved);
                break;
        }
        this.isMoved = false;
    }

    @action.bound
    moveBox(mouse: Vector2) {

    }

}