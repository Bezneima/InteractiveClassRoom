import React from "react";
import {useCanvasStore} from "../../../../../Store/hooks";
import {BoxElement, ERenderedElementType} from "../../../../../Store/CanvasStore/types";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {BoxElementMesh} from "../../CanvasElements/BoxElementMesh/BoxElementMesh";

//Этой файл нужен будет чтобы потом понимать приоритеты рендеров и прочее и рендерить и выключать включать то что находится и не находится на камере...
export const CanvasRenderer: React.FC = observer(() => {
    const canvasStore = useCanvasStore();
    console.log('Рендерю', toJS(canvasStore.renderedElements));
    const elements = canvasStore.renderedElements.map((element) => {
        switch (element.type) {
            case ERenderedElementType.Box:
                // Вот as это конечно не очень нравится, но я хз как по другому
                const boxElement = element as BoxElement;
                console.log('Рендерю id:', boxElement.endV2);
                return <BoxElementMesh key={boxElement.id} boxElement={boxElement}/>;
            case ERenderedElementType.Text:
                break;
            case ERenderedElementType.Line:
                break;
            default:
                return <></>;
        }
    });
    return (<>{elements}</>);
});