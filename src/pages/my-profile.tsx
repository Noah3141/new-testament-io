import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import { VscEdit } from "react-icons/vsc";
import WarningPage from "~/components/DefaultPages/WarningPage";
import PageBlock from "~/components/Layouts/Page";
import Loading from "~/components/Loading";
import ProfileImage from "~/components/ProfileImage";
import { api } from "~/utils/api";
import { showName } from "~/utils/tools";

type ProfileForm = {
    name: string | null;
    email: string | null;
    image: string | null;
    denomination: string | null;
    age: number | null;
    churchFrequency: number | null;
    churchSatisfaction: number | null;
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
    };
    const [form, setForm] = useState<ProfileForm>({ ...defaultUserState });

    if (status != "authenticated" || !user) {
        return (
            <WarningPage warning="You must be signed in to see your profile." />
        );
    }

    if (userDataLoading) {
        return (
            <PageBlock>
                <Loading />
            </PageBlock>
        );
    }
    return (
        <PageBlock>
            <div className="">
                <div className="flex h-full flex-row items-center gap-3 border-b border-basic-800 px-12 pb-6">
                    <div className="group relative">
                        <ProfileImage
                            size={120}
                            src={session.user.image ?? undefined}
                        />
                        <div
                            onClick={() => {
                                console.log("editting");
                            }}
                            className="absolute right-0 top-0 z-10 hidden after:absolute after:top-0 after:h-6 after:w-6 after:rounded-full after:bg-primary-700 after:opacity-40 hover:cursor-pointer group-hover:inline"
                        >
                            <div className="flex h-6 w-6 flex-row items-center justify-center ">
                                <VscEdit className="relative z-20" />
                            </div>
                        </div>
                    </div>
                    <span className="text-3xl">{showName(user)}</span>
                    <div className="flex w-full flex-row justify-end">
                        <span className="text-basic-50">
                            {user.rating ?? "No rating"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 px-12 py-6">
                <h1 className="font-bold">Profile Settings</h1>
                <div>
                    <div>Email: </div>
                    {user.email}
                </div>
                <div>
                    <div>Church frequency: </div>
                    {user.churchFrequency ?? "Not provided"}
                </div>
                <div>
                    <div>Denomination: </div>
                    {user.denomination ?? "Not provided"}
                </div>
                <div>
                    <div>Church Satisfaction:</div>
                    {user.churchSatisfaction ?? "Not provided"}
                </div>
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
