import {Vector2} from "three";
import {EMouseStages} from "./types";
import {BoxElement, RenderedElement, TRenderedElementsMap} from "../../../../../Store/CanvasStore/types";
import {IObservableArray} from "mobx";
import {clearSelectedElementsArray, getNewElementId} from "../utils";
import DepthService from "../DepthService/DepthService";

export const createBox = (
    stage: EMouseStages,
    renderedElementsMap: TRenderedElementsMap,
    renderedElements: IObservableArray<RenderedElement>,
    selectedElements: IObservableArray<RenderedElement>,
    mousePos: Vector2,
    isMoved?: boolean
) => {
    switch (stage) {
        case EMouseStages.start:
            clearSelectedElementsArray(selectedElements);
            const newId = getNewElementId(renderedElements);
            const newZIndex = DepthService.getNewMaxDepth(renderedElements);
            const newBox = new BoxElement(newId, mousePos, mousePos, newZIndex);
            const newRenderedIndex = renderedElements.push(newBox) - 1;
            selectedElements.push(newBox);
            renderedElementsMap[newId] = {indexInArray: newRenderedIndex, value: newBox};
            break;
        case EMouseStages.move:
            const selectedBox = selectedElements[0] as BoxElement;
            selectedBox.endV2 = mousePos;
            break;
        case EMouseStages.end:
            if (!isMoved) {
                const selectedBox = selectedElements[0] as BoxElement;
                selectedBox.startV2 = new Vector2(mousePos.x - 50, mousePos.y - 50);
                selectedBox.endV2 = new Vector2(mousePos.x + 50, mousePos.y + 50);
            }
            break;
    }
};
