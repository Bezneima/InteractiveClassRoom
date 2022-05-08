import React from "react";
import {CanvasRenderer} from "../CanvasRenderer/CanvasRenderer";

export const DashBoardCore: React.FC = () => {
    //const dashBoardDispatch = useDispatch(DashBoardDispatchContext);

    /*
    const onSelectModeClick = useCallback(() => {
        dashBoardDispatch({type: "SetSelectMode"});
    }, [dashBoardDispatch]);

    const onCreateBoxModeClick = useCallback(() => {
        dashBoardDispatch({type: "SetCreateBoxMode"});
    }, [dashBoardDispatch]);
     */


    return (
        <>
            {/*<div style={{position: 'absolute', zIndex: 5}}>*/}
            {/*    <Button onClick={onSelectModeClick}>Select</Button>*/}
            {/*    <Button onClick={onCreateBoxModeClick}>CreateBox</Button>*/}
            {/*</div>*/}
            <CanvasRenderer/>
        </>
    );
}