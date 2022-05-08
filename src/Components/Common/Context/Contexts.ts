import {createContext} from "react";
import {TDashBoardDispatch, TDashBoardState} from "./DashBoardContext/types";

export const DashBoardStateContext = createContext<TDashBoardState | undefined>(undefined)
export const DashBoardDispatchContext = createContext<TDashBoardDispatch | undefined>(undefined)
export const CanvasStateContext = createContext<TDashBoardState | undefined>(undefined)
export const CanvasDispatchContext = createContext<TDashBoardDispatch | undefined>(undefined)