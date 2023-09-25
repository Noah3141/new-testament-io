//todo Links to all the files/folders' components
//todo gets URL and matches it for which of its own links to highlight
//todo Gets view state and juices up links to stay within that User's notebook
//todo Disables or hides links for which that user has no interpretation yet

import Link from "next/link";
import React, { type ReactNode, useState } from "react";
import { useSidebarContext } from "~/server/contexts";

// type SidebarProps = {};

const Sidebar = ({}) => {
    const { sidebarState, setSidebarState } = useSidebarContext();

    return (
        <div className="sticky top-0 max-h-screen w-[320px]  shrink-0 overflow-y-scroll  pt-6  text-lg">
            <div className="flex shrink-0 flex-col items-start">
                <SuperDropdown
                    expanded={sidebarState.Gospels}
                    onClick={() =>
                        setSidebarState({
                            ...sidebarState,
                            Gospels: !sidebarState.Gospels,
                        })
                    }
                    targetHeight={"h-[600px]"}
                    sectionTitle="Gospels"
                    defaultState={true}
                >
                    {/* KINGDOM OF HEAVEN SECTION */}
                    <Dropdown
                        expanded={sidebarState.KingdomOfHeaven}
                        onClick={() =>
                            setSidebarState({
                                ...sidebarState,
                                KingdomOfHeaven: !sidebarState.KingdomOfHeaven,
                            })
                        }
                        targetHeight={"h-36"}
                        sectionTitle="Kingdom of Heaven"
                        defaultState={false}
                    >
                        {/* LINKS LIST */}
                        <SidebarLink
                            link={`/notebook/kingdom-of-heaven/weed-among-wheat`}
                        >
                            Parable of The Weeds Among the Wheat
                        </SidebarLink>
                        <SidebarLink
                            link={`/notebook/kingdom-of-heaven/new-cloth`}
                        >
                            New Cloth and Old
                        </SidebarLink>
                    </Dropdown>
                    <Dropdown
                        expanded={sidebarState.KingdomOfHeaven}
                        onClick={() =>
                            setSidebarState({
                                ...sidebarState,
                                KingdomOfHeaven: !sidebarState.KingdomOfHeaven,
                            })
                        }
                        targetHeight={"h-24"}
                        sectionTitle="Sermon on the Mount"
                        defaultState={false}
                    >
                        <SidebarLink link={``}>f</SidebarLink>
                    </Dropdown>
                    <Dropdown
                        expanded={sidebarState.KingdomOfHeaven}
                        onClick={() =>
                            setSidebarState({
                                ...sidebarState,
                                KingdomOfHeaven: !sidebarState.KingdomOfHeaven,
                            })
                        }
                        targetHeight={"h-96"}
                        sectionTitle="Miracles"
                        defaultState={false}
                    >
                        <SidebarLink link={``}>f</SidebarLink>
                    </Dropdown>
                </SuperDropdown>
                <Dropdown
                    expanded={sidebarState.KingdomOfHeaven}
                    onClick={() =>
                        setSidebarState({
                            ...sidebarState,
                            KingdomOfHeaven: !sidebarState.KingdomOfHeaven,
                        })
                    }
                    targetHeight={"h-24"}
                    sectionTitle="Fire & Water"
                    defaultState={false}
                >
                    <SidebarLink link={``}>Reference 2</SidebarLink>
                </Dropdown>
                <Dropdown
                    expanded={sidebarState.KingdomOfHeaven}
                    onClick={() =>
                        setSidebarState({
                            ...sidebarState,
                            KingdomOfHeaven: !sidebarState.KingdomOfHeaven,
                        })
                    }
                    targetHeight={"h-96"}
                    sectionTitle="Pharisees"
                    defaultState={false}
                >
                    <SidebarLink link={``}>f</SidebarLink>
                </Dropdown>
            </div>
        </div>
    );
};

type DropdownProps = {
    children: ReactNode;
    defaultState: boolean;
    sectionTitle: string;
    targetHeight: string;
    expanded: boolean;
    onClick: React.MouseEventHandler<HTMLSpanElement>;
};

const SidebarLink = ({
    link,
    children: text,
}: {
    link: string;
    children: ReactNode;
}) => {
    return (
        <Link className={`pe-1 ps-6 hover:text-primary-700  `} href={link}>
            {text}
        </Link>
    );
};

const Dropdown = ({
    children,
    sectionTitle,
    expanded,
    onClick,
    targetHeight,
}: DropdownProps) => {
    return (
        <>
            <div
                className={`flex w-full cursor-pointer flex-col overflow-hidden border-b border-basic-800  ps-6 transition-[height] duration-200  ${
                    expanded ? targetHeight : "h-8"
                }`}
            >
                <span
                    className="mb-1 hover:text-primary-600 "
                    onClick={onClick}
                >
                    {sectionTitle}
                </span>
                {children}
            </div>
        </>
    );
};

const SuperDropdown = ({
    children: children,
    defaultState,
    sectionTitle,
    targetHeight,
}: DropdownProps) => {
    const [expanded, setSidebarState] = useState(defaultState);
    return (
        <>
            <div
                className={`flex w-full cursor-pointer flex-col overflow-hidden border-b border-basic-800  transition-[height] duration-200  ${
                    expanded ? targetHeight : "h-8"
                }`}
            >
                <span
                    className="mb-1 ps-6 text-xl font-semibold hover:text-primary-600"
                    onClick={() => setSidebarState((v) => !v)}
                >
                    {sectionTitle}
                </span>
                {children}
            </div>
        </>
    );
};

export default Sidebar;
