import {Vector2} from "three";
import {ECreationsStages} from "./types";
import {BoxElement, TCanvasDispatch} from "../../../Context/CanvasContext/types";

export const createBox = (dashBoardDispatch: TCanvasDispatch, stage: ECreationsStages, startV2: Vector2, endV2?: Vector2, isClick?: boolean) => {
    // Когда кликнул нужно добавить в объекты бокс размером 1 на 1 и ждать далее
    switch (stage) {
        case ECreationsStages.start:
            const newBox = new BoxElement(startV2, startV2, 1);
            dashBoardDispatch({type: 'AddElement', value: newBox});
            break;
        case ECreationsStages.move:
            break;
        case ECreationsStages.end:
            break;
    }
};