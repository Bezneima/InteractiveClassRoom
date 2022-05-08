import React, {createContext, useContext, useReducer} from "react";
import {CanvasProviderProps, TCanvasDispatch, TCanvasState} from "./types";
import {CanvasContextInitState} from "../consts";
import {CanvasReducer} from "./CanvasReducer";

const CanvasStateContext = createContext<TCanvasState | undefined>(undefined)
const CanvasDispatchContext = createContext<TCanvasDispatch | undefined>(
    undefined,
)

const CanvasProvider = ({children}: CanvasProviderProps) => {
    const [state, dispatch] = useReducer(CanvasReducer, CanvasContextInitState);
    return (
        <CanvasStateContext.Provider value={state}>
            <CanvasDispatchContext.Provider value={dispatch}>
                {children}
            </CanvasDispatchContext.Provider>
        </CanvasStateContext.Provider>
    )
}

const useCanvasState = () => {
    const context = useContext(CanvasStateContext);
    if (context === undefined) {
        throw new Error('useDashBoardState must be used within a DashBoardProvider')
    }
    return context
}

const useCanvasDispatch = () => {
    const context = useContext(CanvasDispatchContext)
    if (context === undefined) {
        throw new Error('useDashBoardDispatch must be used within a DashBoardProvider')
    }
    return context
}

export {CanvasProvider, useCanvasState, useCanvasDispatch}