import {useRootStore} from "./createStore";

export const useCanvasStore = () => {
    const root = useRootStore();
    return root.canvasStore;
}