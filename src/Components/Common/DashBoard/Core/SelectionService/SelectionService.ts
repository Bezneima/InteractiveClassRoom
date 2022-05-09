import {RenderedElement} from "../../../../../Store/CanvasStore/types";
import {IObservableArray} from "mobx";

export const clearSelectedElementsArray = (selectedElements: IObservableArray<RenderedElement>) => {
    // Вдруг что-то будет потом еще делаться поэтому решил сделать функцией;
    selectedElements.forEach((element) => {
        element.isSelected = false;
    });
    selectedElements.clear();
}