import React, {createContext, useContext, useReducer} from "react";
import {DashBoardProviderProps, TDashBoardDispatch, TDashBoardState} from "./types";
import {DashBoardContextInitState} from "../consts";
import {DashBoardReducer} from "./DashBoardReducer";

const DashBoardStateContext = createContext<TDashBoardState | undefined>(undefined)
const DashBoardDispatchContext = createContext<TDashBoardDispatch | undefined>(
    undefined,
)

const DashBoardProvider = ({children}: DashBoardProviderProps) => {
    const [state, dispatch] = useReducer(DashBoardReducer, DashBoardContextInitState);
    return (
        <DashBoardStateContext.Provider value={state}>
            <DashBoardDispatchContext.Provider value={dispatch}>
                {children}
            </DashBoardDispatchContext.Provider>
        </DashBoardStateContext.Provider>
    )
}

const useDashBoardState = () => {
    const context = useContext(DashBoardStateContext);
    if (context === undefined) {
        throw new Error('useDashBoardState must be used within a DashBoardProvider')
    }
    return context
}

const useDashBoardDispatch = () => {
    const context = useContext(DashBoardDispatchContext)
    if (context === undefined) {
        throw new Error('useDashBoardDispatch must be used within a DashBoardProvider')
    }
    return context
}

export {DashBoardProvider, useDashBoardState, useDashBoardDispatch}