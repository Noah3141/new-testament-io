import { createContext, useContext } from "react";

export type SidebarContext = {
    sidebarState: SidebarDropdownState;
    setSidebarState: (state: SidebarDropdownState) => void;
};

export const sidebarDropdownState = {
    Gospels: true,
    KingdomOfHeaven: false,
    Sayings: false,
    SermonOnTheMount: false,
    Symbols: false,
};

export type SidebarDropdownState = typeof sidebarDropdownState;

export const SidebarContext = createContext<SidebarContext>({
    sidebarState: sidebarDropdownState, // set a default value
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSidebarState: (state: SidebarDropdownState) => {
        state;
    },
});
export const useSidebarContext = () => useContext(SidebarContext);

export type ViewContext = {
    viewing: string | null;
    setViewing: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ViewStateContext = createContext<ViewContext>({
    viewing: "Hello World", // set a default value
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setViewing: (): void => {},
});
export const useViewContext = () => useContext(ViewStateContext);
