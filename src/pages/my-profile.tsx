/* eslint-disable @typescript-eslint/no-empty-function */
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import { VscEdit } from "react-icons/vsc";
import WarningPage from "~/components/DefaultPages/WarningPage";
import PageBlock from "~/components/Layouts/Page";
import Loading from "~/components/Loading";
import ProfileImage from "~/components/ProfileImage";
import { api } from "~/utils/api";
import HoverEdit from "~/components/HoverEdit";
import CommentaryList from "~/components/CommentaryList";

type ProfileForm = {
    name: string | null;
    email: string | null;
    image: string | null;
    denomination: string | null;
    age: number | null;
    churchFrequency: number | null;
    churchSatisfaction: number | null;
    visible: boolean;
};

const MyProfile = () => {
    const { data: session, status } = useSession();
    const { data: user, isLoading: userDataLoading } =
        api.user.getSession.useQuery();
    const defaultUserState = user ?? {
        name: null,
        email: null,
        image: null,
        denomination: null,
        age: null,
        churchFrequency: null,
        churchSatisfaction: null,
        visible: true,
    };

    const { data: commentaries, isLoading: commentariesLoading } =
        api.commentary.getAllByUserId.useQuery({
            userId: user?.id ?? undefined,
        });

    const [form, setForm] = useState<ProfileForm>({ ...defaultUserState });

    if (status != "authenticated") {
        return (
            <WarningPage warning="You must be signed in to see your profile." />
        );
    }

    if (userDataLoading) {
        return (
            <PageBlock>
                <Loading inline={false} />
            </PageBlock>
        );
    }

    if (!user) {
        return (
            <WarningPage warning="You must be signed in to see your profile." />
        );
    }

    return (
        <PageBlock>
            <div className="">
                <div className="flex h-full flex-row items-center gap-3  border-b border-basic-800 px-12 pb-6">
                    <HoverEdit
                        cursorHover={false}
                        editEvent={() => {
                            console.log("foo");
                        }}
                    >
                        <ProfileImage
                            size={120}
                            src={session.user.image ?? undefined}
                        />
                    </HoverEdit>
                    <span className="text-3xl">{user.name}</span>
                    <div className="flex w-full flex-row justify-end">
                        <span className="text-basic-50">
                            {user.rating ?? "No rating"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5  px-12 py-6 text-xl">
                <h1 className="font-bold">Profile Settings</h1>
                <div className="flex flex-col divide-y divide-basic-800">
                    <div className="flex flex-row items-center justify-between pb-2">
                        Name:
                        <HoverEdit
                            cursorHover={true}
                            editEvent={() => {}}
                            className="pe-10"
                        >
                            <span className="cursor-default">{user.name}</span>
                        </HoverEdit>
                    </div>
                    <div className="flex flex-row items-center justify-between py-2">
                        Email:
                        <HoverEdit
                            cursorHover={true}
                            editEvent={() => {}}
                            className="pe-10"
                        >
                            <span className="cursor-default">{user.email}</span>
                        </HoverEdit>
                    </div>
                    <div className="flex flex-row items-center justify-between py-2">
                        Church frequency:{" "}
                        <HoverEdit
                            cursorHover={true}
                            editEvent={() => {}}
                            className="pe-10"
                        >
                            <span className="cursor-default">
                                {user.churchFrequency ?? "Not provided"}
                            </span>
                        </HoverEdit>
                    </div>
                    <div className="flex flex-row items-center justify-between py-2">
                        Denomination:{" "}
                        <HoverEdit
                            cursorHover={true}
                            editEvent={() => {}}
                            className="pe-10"
                        >
                            <span className="cursor-default">
                                {user.denomination ?? "Not provided"}
                            </span>
                        </HoverEdit>
                    </div>
                    <div className="flex flex-row items-center justify-between py-2">
                        Church Satisfaction:
                        <HoverEdit
                            cursorHover={true}
                            editEvent={() => {}}
                            className="pe-10"
                        >
                            <span className="cursor-default">
                                {user.churchSatisfaction ?? "Not provided"}
                            </span>
                        </HoverEdit>
                    </div>
                    <div className="flex flex-row items-center justify-between py-2">
                        Profile Visibility:
                        <HoverEdit
                            cursorHover={true}
                            editEvent={() => {}}
                            className="pe-10"
                        >
                            <span className="cursor-default">
                                {user.visible ? "Visible" : "Hidden"}
                            </span>
                        </HoverEdit>
                    </div>
                </div>
            </div>
            <div className="border-t  border-basic-800 py-6">
                <h1 className="px-12 pb-2 text-2xl">Commentaries</h1>
                <CommentaryList
                    sessionId={session.user.id}
                    userId={user.id}
                    commentaries={commentaries}
                />
            </div>
        </PageBlock>
    );
};

type EditHolsterProps = {
    size?: "small" | "medium" | "large";
    type: "email" | "number" | "string";
    children: ReactNode;
};

const EditHolster = ({
    size = "medium",
    type = "string",
    children,
}: EditHolsterProps) => {
    const [editting, setEditting] = useState(false);

    if (!editting) {
        return <div>{children}</div>;
    } else {
        return <div></div>;
    }
};

export default MyProfile;
