import {Vector2} from "three";
import {ECreationsStages} from "./types";
import {BoxElement, RenderedElement, TRenderedElementsMap} from "../../../../../Store/CanvasStore/types";
import {clearSelectedElementsArray} from "../SelectionService/SelectionService";
import {IObservableArray, observable} from "mobx";

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
            renderedElements.push(newBox);
            selectedElements.push(newBox);
            const map = renderedElementsMap;
            map[newId] = newBox;
            renderedElementsMap = Object.assign({}, map);
            break;
        case ECreationsStages.move:
            const selectedBox = selectedElements[0] as BoxElement;
            const selectedBoxIndex = renderedElements.findIndex((elem) => elem.id === selectedBox.id);
            if (selectedBoxIndex !== -1) {
                renderedElements[selectedBoxIndex].endV2 = mousePos;
                renderedElements.replace([...renderedElements]);
                renderedElementsMap[selectedBox.id] = Object.assign({}, renderedElements[selectedBoxIndex] as BoxElement);
                //renderedElementsMap = Object.assign({}, map);
            }
            break;
        case ECreationsStages.end:
            /*
            if (!isMoved) {
                const selectedBox = selectedElements[0] as BoxElement;
                const selectedBoxIndex = renderedElements.findIndex((elem) => elem.id === selectedBox.id);
                if (selectedBoxIndex !== -1) {
                    const newBox = new BoxElement(getNewElementId(renderedElements), new Vector2(mousePos.x - 50, mousePos.y - 50), new Vector2(mousePos.x + 50, mousePos.y + 50), 0);
                    clearSelectedElementsArray(selectedElements);
                    renderedElements.splice(selectedBoxIndex, 1, newBox);
                    selectedElements.push(newBox);
                }
            }
             */
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