import React from "react";
import {useCanvasStore} from "../../../../../Store/hooks";
import {SelectionBox} from "../../../../../Store/CanvasStore/types";
import {SelectionBoxMesh} from "../../CanvasElements/SeletingBoxMesh/SelectionBoxMesh";
import {observer} from "mobx-react-lite";

export const UserUIElements: React.FC = observer(() => {
    // Тут будут всякие рисовалки временные пользователей которые будут пропадать, смайлики, селекбокс и тд, что не нужно сохранять
    const canvasStore = useCanvasStore();
    const {selection, selectedElements} = canvasStore;
    let rendered: Array<any> = [];
    if (selection) {
        const {startV2, endV2, isSelecting} = selection;
        if(startV2 && endV2 && isSelecting) {
            const newSelectionBox = new SelectionBox('selectionBox', 'Pavel Kucher', startV2, endV2, 0.1, isSelecting);
            rendered.push(<SelectionBoxMesh key={'selectionBox'} selectionBox={newSelectionBox}/>);
        }
    }
    return <>{rendered && rendered}</>;
});