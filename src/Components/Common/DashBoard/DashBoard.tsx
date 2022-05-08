import React from 'react'
import {DashBoardCore} from "./CanvasElements/DashBoardCore/DashBoardCore";
import {DashBoardProvider} from "../Context/DashBoardContext/DashBoardContext";

export const DashBoard: React.FC = () => {
    return (
        <DashBoardProvider>
            <DashBoardCore/>
        </DashBoardProvider>
    );
}