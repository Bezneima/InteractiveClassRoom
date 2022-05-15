import {ERenderedElementType, RenderedElement} from "../../../../Store/CanvasStore/types";
import {Vector2} from "three";
import {IObservableArray} from "mobx";

const {max, min} = Math;

export const isRenderedElementInArea = (element: RenderedElement, areaStartV2: Vector2, areaEndV2: Vector2) => {
    // тут конечно нужно будет потом запариться думаю ппц как, когда у меня появится возможность поварачивать элементы или элемент не будет квадратом
    let result = false;
    switch (element.type) {
        case ERenderedElementType.Box:
            result = isBoxElementInArea(element, areaStartV2, areaEndV2);
            break;
    }
    return result;
}

export const isBoxElementInArea = (element: RenderedElement, areaStartV2: Vector2, areaEndV2: Vector2) => {
    // Для повернутых кажись придется вначале их стороны нормализовать чтобы паралельны координатам были
    const {startV2: elemStartV2, endV2: elemEndV2} = element;
    // Первый это area, второй это element;
    const fxl = min(areaStartV2.x, areaEndV2.x);
    const fxr = max(areaStartV2.x, areaEndV2.x);
    const fyt = max(areaStartV2.y, areaEndV2.y);
    const fyb = min(areaStartV2.y, areaEndV2.y);

    const sxl = min(elemStartV2.x, elemEndV2.x);
    const sxr = max(elemStartV2.x, elemEndV2.x);
    const syt = max(elemStartV2.y, elemEndV2.y);
    const syb = min(elemStartV2.y, elemEndV2.y);

    return max(fxl, sxl) <= min(fxr, sxr) && max(fyb, syb) <= min(fyt, syt);
}

export const clearSelectedElementsArray = (selectedElements: IObservableArray<RenderedElement>) => {
    // Вдруг что-то будет потом еще делаться поэтому решил сделать функцией;
    selectedElements.forEach((element) => {
        //console.log(`был в выбраном ${element.id} ${element.isSelected}`);
        element.isSelected = false;
    });
    selectedElements.clear();
}

export const getNewElementId = (elements: Array<RenderedElement>): number => {
    let result = 1;
    elements.forEach(elem => {
        if (elem.id >= result)
            result = elem.id + 1;
    });
    return result;
}