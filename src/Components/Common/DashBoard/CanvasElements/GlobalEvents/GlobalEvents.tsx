import React, {useEffect} from "react";
import {useCanvasStore} from "../../../../../Store/hooks";

export const GlobalEvents: React.FC = () => {
    const canvasStore = useCanvasStore();
    useEffect(() => {
        window.addEventListener('resize', canvasStore.onInnerWindowSizeChange);
        return () => {
            window.removeEventListener('resize', canvasStore.onInnerWindowSizeChange);
        }
    }, [canvasStore.onInnerWindowSizeChange]);
    return <></>;
}