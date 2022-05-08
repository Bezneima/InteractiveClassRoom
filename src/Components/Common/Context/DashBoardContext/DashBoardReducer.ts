import {TDashBoardAction, TDashBoardState} from "./types";

export const DashBoardReducer = (state: TDashBoardState, action: TDashBoardAction): TDashBoardState => {
    //Конечно придумать что-то, а то будет дофига длинный свитч.
    switch (action.type) {
        default: {
            console.error('Unhandled action type:', action);
            throw new Error(`Unhandled action type: ${action}`)
        }
    }
}