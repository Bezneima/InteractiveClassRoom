import {Vector2} from "three";
import {ECreationsStages} from "./types";
import {BoxElement, RenderedElement, TRenderedElementsMap} from "../../../../../Store/CanvasStore/types";
import {clearSelectedElementsArray} from "../SelectionService/SelectionService";
import {IObservableArray} from "mobx";

export const createBox = (
    stage: ECreationsStages,
    renderedElementsMap: TRenderedElementsMap,
    renderedElements: IObservableArray<RenderedElement>,
    selectedElements: IObservableArray<RenderedElement>,
    mousePos: Vector2,
    isMoved?: boolean
) => {
    // Когда кликнул нужно добавить в объекты бокс размером 1 на 1 и ждать далее
    switch (stage) {
        case ECreationsStages.start:
            clearSelectedElementsArray(selectedElements);
            const newId = getNewElementId(renderedElements);
            const newBox = new BoxElement(newId, mousePos, mousePos, 0);
            const elementIndexInArray = renderedElements.push(newBox) - 1;
            selectedElements.push(newBox);
            renderedElementsMap[newId] = {indexInArray: elementIndexInArray, value: newBox};
            break;
        case ECreationsStages.move:
            const selectedBox = selectedElements[0];
            const tmp = renderedElementsMap[selectedBox.id];
            if (tmp) {
                const prevBox = tmp.value as BoxElement;
                const indexInArray = tmp.indexInArray;
                const newBoxElement = new BoxElement(prevBox.id, prevBox.startV2, mousePos, prevBox.zIndex, prevBox.color);
                renderedElementsMap[selectedBox.id] = {indexInArray: indexInArray, value: newBoxElement};
                renderedElements[indexInArray] = newBoxElement;
            }
            break;
        case ECreationsStages.end:
            if (!isMoved) {
                const selectedBox = selectedElements[0] as BoxElement;
                const tmp = renderedElementsMap[selectedBox.id];
                const indexInArray = tmp.indexInArray;
                if (tmp && indexInArray) {
                    const newBox = new BoxElement(selectedBox.id, new Vector2(mousePos.x - 50, mousePos.y - 50), new Vector2(mousePos.x + 50, mousePos.y + 50), 0);
                    clearSelectedElementsArray(selectedElements);
                    renderedElements[indexInArray] = newBox;
                    renderedElementsMap[selectedBox.id] = {indexInArray: indexInArray, value: newBox};
                    selectedElements.push(newBox);
                }
            }
            break;
    }
};

export const getNewElementId = (elements: IObservableArray<RenderedElement>): number => {
    let result = 1;
    elements.forEach(elem => {
        if (elem.id >= result)
            result = elem.id + 1;
    });
    return result;
}