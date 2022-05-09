import {RootStore} from "./RootStore";
import {createContext, ReactNode, useContext} from "react";
import CanvasStore from "./CanvasStore/CanvasStore";

let rootStore: RootStore;
const RootStoreContext = createContext<RootStore | undefined>(undefined);

export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
    //only create the store once ( store is a singleton)
    const canvasStore = new CanvasStore();
    const root = rootStore ?? new RootStore(canvasStore);

    return <RootStoreContext.Provider value={root}>{children}</RootStoreContext.Provider>
}

export const useRootStore = () => {
    const context = useContext(RootStoreContext);
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider")
    }

    return context
}
