import {Vector2} from "three";
import {ECreationsStages} from "./types";
import {BoxElement, RenderedElement, TRenderedElementsMap} from "../../../../../Store/CanvasStore/types";
import {clearSelectedElementsArray} from "../SelectionService/SelectionService";
import {IObservableArray} from "mobx";

export const createBox = (
    stage: ECreationsStages,
    renderedElementsMap: TRenderedElementsMap,
    renderedElements: Array<RenderedElement>,
    selectedElements: Array<RenderedElement>,
    mousePos: Vector2,
    isMoved?: boolean
) => {
    // Когда кликнул нужно добавить в объекты бокс размером 1 на 1 и ждать далее
    switch (stage) {
        case ECreationsStages.start:
            clearSelectedElementsArray(selectedElements);
            const newId = getNewElementId(renderedElements);
            const newBox = new BoxElement(newId, mousePos, mousePos, 0);
            renderedElements.push(newBox);
            selectedElements.push(newBox);
            break;
        case ECreationsStages.move:
            break;
        case ECreationsStages.end:
            if (!isMoved) {
                const selectedBox = selectedElements[0] as BoxElement;
                renderedElements[0].endV2 = new Vector2(mousePos.x + 50, mousePos.y + 50);
                console.log(renderedElements[0]);
            }
            break;
        /*
        case ECreationsStages.start:
            clearSelectedElementsArray(selectedElements);
            const newId = getNewElementId(renderedElements);
            const newBox = new BoxElement(newId, mousePos, mousePos, 0);
            const elementIndexInArray = renderedElements.push(newBox) - 1;
            selectedElements.push(newBox);
            renderedElementsMap[newId] = {indexInArray: elementIndexInArray, value: newBox};
            break;
        case ECreationsStages.move:
            console.log('Какого-то хуя тут был');
            const selectedBox = selectedElements[0] as BoxElement;
            const tmp = renderedElementsMap[selectedBox.id];
            if (tmp) {
                const prevBox = tmp.value as BoxElement;
                const indexInArray = tmp.indexInArray;
                const newBoxElement = new BoxElement(prevBox.id, prevBox.startV2, mousePos, prevBox.zIndex, prevBox.color);
                renderedElementsMap[selectedBox.id] = {indexInArray: indexInArray, value: newBoxElement};
                renderedElements[indexInArray] = newBoxElement;
                const selectedElementsIndex = selectedElements.findIndex(elem => elem.id === selectedBox.id);
                selectedElements[selectedElementsIndex] = newBoxElement;
            }
            break;
        case ECreationsStages.end:
            if (!isMoved) {
                const selectedBox = selectedElements[0] as BoxElement;
                const tmp = renderedElementsMap[selectedBox.id];
                if (tmp) {
                    const prevBox = tmp.value as BoxElement;
                    const indexInArray = tmp.indexInArray;
                    const newBoxElement = new BoxElement(prevBox.id, new Vector2(mousePos.x - 50, mousePos.y - 50), new Vector2(mousePos.x + 50, mousePos.y + 50), prevBox.zIndex, prevBox.color);
                    renderedElementsMap[selectedBox.id] = {indexInArray: indexInArray, value: newBoxElement};
                    renderedElements[indexInArray] = newBoxElement;
                    const selectedElementsIndex = selectedElements.findIndex(elem => elem.id === selectedBox.id);
                    selectedElements[selectedElementsIndex] = newBoxElement;
                    console.log(selectedElements[0] === renderedElements[0]);
                }
            }
            break;
         */
    }
};

export const getNewElementId = (elements: Array<RenderedElement>): number => {
    let result = 1;
    elements.forEach(elem => {
        if (elem.id >= result)
            result = elem.id + 1;
    });
    return result;
}