import {RenderedElement} from "../../../../../Store/CanvasStore/types";
import {IObservableArray} from "mobx";

export const clearSelectedElementsArray = (selectedElements: Array<RenderedElement>) => {
    // Вдруг что-то будет потом еще делаться поэтому решил сделать функцией;
    console.log(`Сейчас пройдусь по выбранным элементам`, selectedElements);
    selectedElements.forEach((element) => {
        //console.log(`был в выбраном ${element.id} ${element.isSelected}`);
        element.isSelected = false;
    });
    selectedElements = [];
}