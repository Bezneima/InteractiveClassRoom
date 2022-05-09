import {Vector2} from "three";
import {ECreationsStages} from "./types";
import {BoxElement, RenderedElement} from "../../../../../Store/CanvasStore/types";
import {clearSelectedElementsArray} from "../SelectionService/SelectionService";
import {IObservableArray} from "mobx";

export const createBox = (
    stage: ECreationsStages,
    renderedElements: IObservableArray<RenderedElement>,
    selectedElements: IObservableArray<RenderedElement>,
    mousePos: Vector2,
    isMoved?: boolean
) => {
    // Когда кликнул нужно добавить в объекты бокс размером 1 на 1 и ждать далее
    switch (stage) {
        case ECreationsStages.start:
            clearSelectedElementsArray(selectedElements);
            const newBox = new BoxElement(getNewElementId(renderedElements), mousePos, new Vector2(mousePos.x, mousePos.y), 0);
            renderedElements.push(newBox);
            selectedElements.push(newBox);
            break;
        case ECreationsStages.move:
            const selectedBox = selectedElements[0] as BoxElement;
            const selectedBoxIndex = renderedElements.findIndex((elem) => elem.id === selectedBox.id);
            if (selectedBoxIndex !== -1) {
                const renderedElem = renderedElements[selectedBoxIndex];
                renderedElem.endV2 = mousePos;
                // Вот это звучит как тотальный пиздец, но как обновить значение чтобы стейт понял что нужно сделать ререндер я хз
                // Проблема в том что если я меняю endV2 меняется локальная копия обьекта, а не элемент внутри массиваю
                // Но вроде не лагает, и вроде все норм. Буду рад если поможешь поменять.
                renderedElements.splice(selectedBoxIndex, 1, renderedElem);
            }
            break;
        case ECreationsStages.end:
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