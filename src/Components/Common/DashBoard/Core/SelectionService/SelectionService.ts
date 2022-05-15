import {BoxElement, RenderedElement, TRenderedElementsMap, TSelection} from "../../../../../Store/CanvasStore/types";
import {IObservableArray, toJS} from "mobx";
import {EMouseStages} from "../CreateElementService/types";
import {Vector2} from "three";
import {clearSelectedElementsArray, isRenderedElementInArea} from "../utils";
import DepthService from "../DepthService/DepthService";

export const selectArea = (
    stage: EMouseStages,
    selection: TSelection,
    renderedElementsMap: TRenderedElementsMap,
    renderedElements: IObservableArray<RenderedElement>,
    selectedElements: IObservableArray<RenderedElement>,
    mousePos: Vector2,
    isMoved?: boolean
) => {
    switch (stage) {
        case EMouseStages.start:
            clearSelectedElementsArray(selectedElements);
            selection.isSelecting = true;
            selection.startV2 = mousePos;
            selection.endV2 = mousePos;
            break;
        case EMouseStages.move:
            selection.endV2 = mousePos;
            break;
        case EMouseStages.end:
            // Потом доделать чтобы рендерешиеся элементы были разбиты на чанки для оптимизации
            selection.endV2 = mousePos
            const {startV2, endV2} = selection;
            if (selection && startV2 && endV2) {
                const elementsInArea = renderedElements.filter((element) => {
                    return isRenderedElementInArea(element, startV2, endV2);
                });

                if (!isMoved) {
                    const frontElement = DepthService.moveFromElementsToFront(mousePos, elementsInArea, renderedElements);
                    if (frontElement) {
                        frontElement.isSelected = true;
                        selectedElements.push(frontElement);
                    }
                    //console.log(toJS(renderedElements));
                } else {
                    selectedElements.push(...elementsInArea);
                    //console.log(selectedElements);
                }
            }
            selectedElements.forEach(element => {
                element.isSelected = true;
            });
            selection.isSelecting = false;
            break;
    }
};



