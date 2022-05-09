import CanvasStore from "./CanvasStore/CanvasStore";

export class RootStore {
    canvasStore: CanvasStore;

    constructor(canvasStore: CanvasStore) {
        this.canvasStore = canvasStore;
    }
}
