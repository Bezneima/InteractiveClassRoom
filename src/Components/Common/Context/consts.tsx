import {Vector2} from "three";
import {ECanvasMode, TCanvasState} from "./CanvasContext/types";
import {TDashBoardState} from "./DashBoardContext/types";

export const CanvasContextInitState: TCanvasState = {
    mode: ECanvasMode.SelectMode,
    selection: {
        isSelecting: false,
        startV2: new Vector2(0, 0),
        endV2: new Vector2(0, 0),
    },
    renderedElements: []
}

export const DashBoardContextInitState: TDashBoardState = {}