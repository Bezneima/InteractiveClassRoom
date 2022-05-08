
import {ECanvasMode, TCanvasAction, TCanvasState} from "./types";

export const CanvasReducer = (state: TCanvasState, action: TCanvasAction): TCanvasState => {
    //Конечно придумать что-то, а то будет дофига длинный свитч.
    switch (action.type) {
        case 'SelectingPointerDown': {
            return {
                ...state,
                selection: {
                    ...state.selection,
                    isSelecting: true,
                    startV2: action.value.startV2,
                    endV2: action.value.endV2
                }
            }
        }
        case 'SelectingPointerMove': {
            return {...state, selection: {...state.selection, endV2: action.value.endV2}}
        }
        case 'SelectingPointerUp': {
            return {
                ...state,
                selection: {
                    ...state.selection,
                    isSelecting: false,
                    startV2: action.value.startV2,
                    endV2: action.value.endV2
                }
            }
        }
        case 'SetSelectMode': {
            return {...state, mode: ECanvasMode.SelectMode}
        }
        case 'SetCreateBoxMode': {
            return {...state, mode: ECanvasMode.CreateBoxMode}
        }

        case 'AddElement': {
            return {...state, renderedElements: [...state.renderedElements, action.value]}
        }
        default: {
            console.error('Unhandled action type:', action);
            throw new Error(`Unhandled action type: ${action}`)
        }
    }
}
