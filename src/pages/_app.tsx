import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Navbar from "~/components/Navbar/Navbar";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import {
    SidebarDropdownState,
    ViewStateContext,
    sidebarDropdownState,
} from "~/server/contexts";
import { SidebarContext } from "~/server/contexts";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    const [viewing, setViewing] = useState(session?.user.id ?? null);
    const [sidebarState, setSidebarState] =
        useState<SidebarDropdownState>(sidebarDropdownState);

    return (
        <SessionProvider session={session}>
            <ViewStateContext.Provider
                value={{ viewing: viewing, setViewing: setViewing }}
            >
                <SidebarContext.Provider
                    value={{
                        sidebarState: sidebarState,
                        setSidebarState: setSidebarState,
                    }}
                >
                    <Toaster />
                    <Navbar />
                    <Component {...pageProps} />
                </SidebarContext.Provider>
            </ViewStateContext.Provider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
