import {Camera, Vector2} from "three";
import {createBox} from "../CreateElementService/CreateElementService";
import {ECreationsStages} from "../CreateElementService/types";
import {ECanvasMode, TCanvasDispatch, TCanvasState} from "../../../Context/CanvasContext/types";

export const selectionPointerDown = (dashBoardDispatch: TCanvasDispatch, mouse: Vector2, camera: Camera, state: TCanvasState) => {
    const startPointV2 = new Vector2(mouse.x * window.innerWidth / 2 + camera.position.x, mouse.y * window.innerHeight / 2 + camera.position.y);
    console.log(state.mode);
    switch (state.mode) {
        case ECanvasMode.SelectMode:
            break;
        case ECanvasMode.CreateBoxMode:
            console.log('был тут');
            createBox(dashBoardDispatch, ECreationsStages.start, startPointV2);
            break;
    }
    dashBoardDispatch({
        type: "SelectingPointerDown",
        value: {
            isSelecting: true,
            startV2: new Vector2(mouse.x * window.innerWidth / 2 + camera.position.x, mouse.y * window.innerHeight / 2 + camera.position.y),
            endV2: new Vector2(mouse.x * window.innerWidth / 2 + camera.position.x, mouse.y * window.innerHeight / 2 + camera.position.y)
        }
    });
};

export const selectionPointerMove = (dashBoardDispatch: TCanvasDispatch, mouse: Vector2, camera: Camera, state: TCanvasState) => {
    dashBoardDispatch({
        type: "SelectingPointerMove",
        value: {
            endV2: new Vector2(mouse.x * window.innerWidth / 2 + camera.position.x, mouse.y * window.innerHeight / 2 + camera.position.y)
        }
    });
};

export const selectionPointerUp = (dashBoardDispatch: TCanvasDispatch, mouse: Vector2, camera: Camera, state: TCanvasState) => {
    const endPointV2 = new Vector2(mouse.x * window.innerWidth / 2 + camera.position.x, mouse.y * window.innerHeight / 2 + camera.position.y);
    const startPointV2 = state.selection.startV2;
    if (startPointV2) {
        const isClick = Math.abs(endPointV2.x - startPointV2.x) <= 2 && Math.abs(endPointV2.y - startPointV2.y) <= 2;

        switch (state.mode) {
            case ECanvasMode.SelectMode:
                createBox(dashBoardDispatch, ECreationsStages.end, startPointV2, endPointV2, isClick);
                break;
            case ECanvasMode.CreateBoxMode:
                break;
        }
        dashBoardDispatch({
            type: "SelectingPointerUp",
            value: {
                isSelecting: false,
                startV2: endPointV2,
                endV2: endPointV2
            }
        });
    }
}