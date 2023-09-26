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
                    sectionTitle="Gospels"
                    expanded={sidebarState.Gospels}
                    onClick={() =>
                        setSidebarState({
                            ...sidebarState,
                            Gospels: !sidebarState.Gospels,
                        })
                    }
                    targetHeight={"h-[800px]"}
                >
                    {/* KINGDOM OF HEAVEN SECTION */}
                    <Dropdown
                        sectionTitle="Kingdom of Heaven"
                        expanded={sidebarState.KingdomOfHeaven}
                        onClick={() =>
                            setSidebarState({
                                ...sidebarState,
                                KingdomOfHeaven: !sidebarState.KingdomOfHeaven,
                            })
                        }
                        targetHeight={"h-36"}
                    >
                        {/* LINKS LIST */}
                        <SidebarLink
                            link={`/notebook/kingdom-of-heaven/weed-among-wheat`}
                            text="Parable of The Weeds Among the Wheat"
                        />
                        <SidebarLink
                            link={`/notebook/kingdom-of-heaven/new-cloth`}
                            text="New Cloth and Old"
                        />
                    </Dropdown>
                    <Dropdown
                        sectionTitle="Sermon on the Mount"
                        expanded={sidebarState.SermonOnTheMount}
                        onClick={() =>
                            setSidebarState({
                                ...sidebarState,
                                SermonOnTheMount:
                                    !sidebarState.SermonOnTheMount,
                            })
                        }
                        targetHeight={"h-24"}
                    >
                        <SidebarLink link={``} text="Salt and Light" />
                    </Dropdown>
                    <Dropdown
                        sectionTitle="Healings"
                        expanded={sidebarState.Healings}
                        onClick={() =>
                            setSidebarState({
                                ...sidebarState,
                                Healings: !sidebarState.Healings,
                            })
                        }
                        targetHeight={"h-32"}
                    >
                        <SidebarLink link={``} text="The Blind Man" />
                    </Dropdown>
                    <Dropdown
                        sectionTitle="Miracles"
                        expanded={sidebarState.Miracles}
                        onClick={() =>
                            setSidebarState({
                                ...sidebarState,
                                Miracles: !sidebarState.Miracles,
                            })
                        }
                        targetHeight={"h-32"}
                    >
                        <SidebarLink link={``} text="Water Into Wine" />
                    </Dropdown>
                </SuperDropdown>
                <Dropdown
                    sectionTitle="Fire & Water"
                    expanded={sidebarState.FireAndWater}
                    onClick={() =>
                        setSidebarState({
                            ...sidebarState,
                            FireAndWater: !sidebarState.FireAndWater,
                        })
                    }
                    targetHeight={"h-24"}
                >
                    <SidebarLink link={``} text="Born Again of Fire" />
                </Dropdown>
                <Dropdown
                    sectionTitle="Pharisees"
                    expanded={sidebarState.Pharisees}
                    onClick={() =>
                        setSidebarState({
                            ...sidebarState,
                            Pharisees: !sidebarState.Pharisees,
                        })
                    }
                    targetHeight={"h-96"}
                >
                    <SidebarLink link={``} text="Give Unto Ceasar" />
                </Dropdown>
            </div>
        </div>
    );
};

type DropdownProps = {
    children: ReactNode;
    sectionTitle: string;
    targetHeight: string;
    expanded: boolean;
    onClick: React.MouseEventHandler<HTMLSpanElement>;
};

const SidebarLink = ({ link, text }: { link: string; text: string }) => {
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
    sectionTitle,
    onClick,
    expanded,
    targetHeight,
}: DropdownProps) => {
    return (
        <>
            <div
                className={`flex w-full cursor-pointer flex-col overflow-hidden border-b border-basic-800  transition-[height] duration-200  ${
                    expanded ? targetHeight : "h-8"
                }`}
            >
                <span
                    className="mb-1 ps-6 text-xl font-semibold hover:text-primary-600"
                    onClick={onClick}
                >
                    {sectionTitle}
                </span>
                {children}
            </div>
        </>
    );
};

export default Sidebar;
