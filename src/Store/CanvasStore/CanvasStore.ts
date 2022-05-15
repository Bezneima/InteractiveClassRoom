import {action, makeAutoObservable, observable} from "mobx";
import {ECanvasMode, RenderedElement, TRenderedElementsMap, TSelection} from "./types";
import {Vector2} from "three";
import {createBox} from "../../Components/Common/DashBoard/Core/CreateElementService/CreateElementService";
import {EMouseStages} from "../../Components/Common/DashBoard/Core/CreateElementService/types";
import {selectArea} from "../../Components/Common/DashBoard/Core/SelectionService/SelectionService";

export default class CanvasStore {
    mode: ECanvasMode = ECanvasMode.SelectMode;
    canvasWidth: number;
    canvasHeight: number;

    cameraPosX: number;
    cameraPosY: number;

    selectedElements = observable<RenderedElement>([])
    renderedElements = observable<RenderedElement>([]);
    renderedElementsMap: TRenderedElementsMap = {};

    selection = observable<TSelection>({isSelecting: true});
    isSelecting: boolean = false;
    isMoved: boolean = false;


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
                selectArea(EMouseStages.start, this.selection, this.renderedElementsMap, this.renderedElements, this.selectedElements, mouse);
                break;
            case ECanvasMode.CreateBoxMode:
                createBox(EMouseStages.start, this.renderedElementsMap, this.renderedElements, this.selectedElements, mouse);
                break;
        }
    }

    @action.bound
    selectionPointerMove(mouse: Vector2) {
        this.isMoved = true;
        switch (this.mode) {
            case ECanvasMode.SelectMode:
                selectArea(EMouseStages.move, this.selection, this.renderedElementsMap, this.renderedElements, this.selectedElements, mouse);
                break;
            case ECanvasMode.CreateBoxMode:
                createBox(EMouseStages.move, this.renderedElementsMap, this.renderedElements, this.selectedElements, mouse);
                break;
        }
    }

    @action.bound
    selectionPointerUp(mouse: Vector2) {
        switch (this.mode) {
            case ECanvasMode.SelectMode:
                selectArea(EMouseStages.end, this.selection, this.renderedElementsMap, this.renderedElements, this.selectedElements, mouse, this.isMoved);
                break;
            case ECanvasMode.CreateBoxMode:
                createBox(EMouseStages.end, this.renderedElementsMap, this.renderedElements, this.selectedElements, mouse, this.isMoved);
                break;
        }
        this.isMoved = false;
    }

}