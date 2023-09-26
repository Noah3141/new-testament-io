import { createContext, useContext } from "react";

export type SidebarContext = {
    sidebarState: SidebarDropdownState;
    setSidebarState: (state: SidebarDropdownState) => void;
};

export const sidebarDropdownState = {
    // The dropdown headers that can be expanded or collapsed
    Gospels: true,
    KingdomOfHeaven: false,
    SermonOnTheMount: false,
    Healings: false,
    Miracles: false,
    Sayings: false,
    Symbols: false,
    FireAndWater: false,
    Pharisees: false,
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
    viewing: null, // set a default value
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setViewing: (): void => {},
});
export const useViewContext = () => useContext(ViewStateContext);
