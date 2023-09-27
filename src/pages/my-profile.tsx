/* eslint-disable @typescript-eslint/no-empty-function */
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import { VscEdit, VscStarEmpty, VscStarFull } from "react-icons/vsc";
import { AiOutlineCheck } from "react-icons/ai";
import WarningPage from "~/components/DefaultPages/WarningPage";
import PageBlock from "~/components/Layouts/Page";
import Loading from "~/components/Loading";
import ProfileImage from "~/components/ProfileImage";
import { api } from "~/utils/api";
import HoverEdit from "~/components/HoverEdit";
import CommentaryList from "~/components/CommentaryList";
import toast from "react-hot-toast";
import { Rating, unstable_useEnhancedEffect } from "@mui/material";

type ProfileForm = {
    name: string | null;
    email: string | null;
    image: string | null;
    denomination: string | null;
    age: number | null;
    churchFrequency: number | undefined | null;
    churchSatisfaction: number | undefined | null;
    visible: boolean;
};

type ProfileEditState = {
    name: boolean;
    email: boolean;
    image: boolean;
    denomination: boolean;
    age: boolean;
    churchFrequency: boolean;
    churchSatisfaction: boolean;
    visible: boolean;
};

const MyProfile = () => {
    const dataState = api.useContext();

    const { data: session, status } = useSession();
    const { data: user, isLoading: userDataLoading } =
        api.user.getSession.useQuery();
    const defaultUserState: ProfileForm = user ?? {
        name: null,
        email: null,
        image: null,
        denomination: null,
        age: null,
        churchFrequency: undefined,
        churchSatisfaction: undefined,
        visible: true,
    };

    const [hover, setHover] = useState(0);

    const { data: commentaries, isLoading: commentariesLoading } =
        api.commentary.getAllByUserId.useQuery({
            userId: user?.id ?? undefined,
        });

    const profileSubmitToast = "profileSubmitToastId";
    const { mutate: submitProfile, isLoading: profileSubmitLoading } =
        api.user.updateProfile.useMutation({
            onMutate: () => {
                toast.loading("Loading...", { id: profileSubmitToast });
            },
            onSuccess: async () => {
                await dataState.user.invalidate();
                toast.success("Profile updated!", { id: profileSubmitToast });
                setEditting(closedEdits);
            },
            onError: () => {
                toast.error("Something went wrong!", {
                    id: profileSubmitToast,
                });
            },
        });

    const closedEdits = {
        name: false,
        email: false,
        image: false,
        denomination: false,
        age: false,
        churchFrequency: false,
        churchSatisfaction: false,
        visible: false,
    };
    const [form, setForm] = useState<ProfileForm>({ ...defaultUserState });
    const [editting, setEditting] = useState<ProfileEditState>(closedEdits);

    if (userDataLoading || status == "loading") {
        return (
            <PageBlock>
                <Loading inline={false} />
            </PageBlock>
        );
    }

    if (status == "unauthenticated" || !session) {
        return (
            <WarningPage warning="You must be signed in to see your profile." />
        );
    }

    if (typeof user == "undefined") {
        return (
            <WarningPage warning="You must be signed in to see your profile." />
        );
    }

    return (
        <PageBlock>
            <div className="">
                <div className="flex h-full flex-row items-center gap-3  border-b border-basic-800 px-12 pb-6">
                    {editting.image ? <></> : <></>}
                    <HoverEdit
                        cursorHover={false}
                        editEvent={() => {
                            setEditting(
                                (): ProfileEditState => ({
                                    ...closedEdits,
                                    image: true,
                                }),
                            );

                            toast.error("You can't do that yet!🏗️", {
                                id: "Not implemented",
                            });
                        }}
                    >
                        <ProfileImage
                            size={120}
                            src={session?.user.image ?? undefined}
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
                        {editting.name ? (
                            <>
                                <div className="flex flex-row items-center gap-3">
                                    <input
                                        onChange={(n) => {
                                            setForm(
                                                (prev): ProfileForm => ({
                                                    ...prev,
                                                    name: n.target.value,
                                                }),
                                            );
                                        }}
                                        className={`rounded-md border-primary-600  bg-basic-50 px-3 text-basic-900 caret-basic-800 outline-none ring-0 hover:cursor-pointer hover:outline-1 hover:outline-primary-600 focus:outline-none`}
                                        type="text"
                                        value={form.name ?? ""}
                                    ></input>
                                    <AiOutlineCheck
                                        onClick={() => {
                                            submitProfile(form);
                                        }}
                                        className="me-2  cursor-pointer rounded-sm bg-primary-500 p-[3px] text-basic-800 hover:bg-primary-600 "
                                    />
                                </div>
                            </>
                        ) : (
                            <HoverEdit
                                cursorHover={true}
                                editEvent={() => {
                                    setEditting(
                                        (): ProfileEditState => ({
                                            ...closedEdits,
                                            name: true,
                                        }),
                                    );
                                }}
                                className="pe-10"
                            >
                                <span className="cursor-default">
                                    {user.name}
                                </span>
                            </HoverEdit>
                        )}
                    </div>
                    <div className="flex flex-row items-center justify-between py-2">
                        Email:
                        {editting.email ? (
                            <>
                                <div className="flex flex-row items-center gap-3">
                                    <input
                                        onChange={(n) => {
                                            setForm(
                                                (prev): ProfileForm => ({
                                                    ...prev,
                                                    email: n.target.value,
                                                }),
                                            );
                                        }}
                                        className={`rounded-md border-primary-600  bg-basic-50 px-3 text-basic-900 caret-basic-800 outline-none ring-0 hover:cursor-pointer hover:outline-1 hover:outline-primary-600 focus:outline-none`}
                                        type="text"
                                        value={form.email ?? ""}
                                    ></input>
                                    <AiOutlineCheck
                                        onClick={() => {
                                            submitProfile(form);
                                        }}
                                        className="me-2  cursor-pointer rounded-sm bg-primary-500 p-[3px] text-basic-800 hover:bg-primary-600 "
                                    />
                                </div>
                            </>
                        ) : (
                            <HoverEdit
                                cursorHover={true}
                                editEvent={() => {
                                    setEditting(
                                        (): ProfileEditState => ({
                                            ...closedEdits,
                                            email: true,
                                        }),
                                    );
                                }}
                                className="pe-10"
                            >
                                <span className="cursor-default">
                                    {user.email}
                                </span>
                            </HoverEdit>
                        )}
                    </div>{" "}
                    <div className="flex flex-row items-center justify-between py-2">
                        Denomination:{" "}
                        {editting.denomination ? (
                            <>
                                <div className="flex flex-row items-center gap-3">
                                    <select
                                        className="rounded-md bg-basic-100 px-2 text-basic-900"
                                        name="denomination"
                                        defaultChecked={undefined}
                                        id="select-denomination"
                                        onChange={(n) => {
                                            setForm(
                                                (prev): ProfileForm => ({
                                                    ...prev,
                                                    denomination:
                                                        n.target.value ?? null,
                                                }),
                                            );
                                        }}
                                        value={form.denomination ?? undefined}
                                    >
                                        <option value={undefined}></option>
                                        <option value="Protestant">
                                            Protestant
                                        </option>
                                        <option value="Catholic">
                                            Catholic
                                        </option>
                                        <option value="Eastern Orthodox">
                                            Eastern Orthodox
                                        </option>
                                        <option value="Non-denominational">
                                            Non-denominational
                                        </option>
                                        <option value="Agnostic">
                                            Agnostic
                                        </option>
                                        <option value="Atheist">Atheist</option>
                                        <option value={undefined}>
                                            Not provided
                                        </option>
                                    </select>
                                    <AiOutlineCheck
                                        onClick={() => {
                                            submitProfile(form);
                                        }}
                                        className="me-2  cursor-pointer rounded-sm bg-primary-500 p-[3px] text-basic-800 hover:bg-primary-600 "
                                    />
                                </div>
                            </>
                        ) : (
                            <HoverEdit
                                cursorHover={true}
                                editEvent={() => {
                                    setEditting(
                                        (): ProfileEditState => ({
                                            ...closedEdits,
                                            denomination: true,
                                        }),
                                    );
                                }}
                                className="pe-10"
                            >
                                <span className="cursor-default">
                                    {user.denomination ?? "Not provided"}
                                </span>
                            </HoverEdit>
                        )}
                    </div>
                    <div className="flex flex-row items-center justify-between py-2">
                        Church frequency:{" "}
                        {editting.churchFrequency ? (
                            <>
                                <div className="flex flex-row items-center gap-3">
                                    <Rating
                                        max={7}
                                        precision={1}
                                        onChange={(e, newValue) => {
                                            setForm(
                                                (prev): ProfileForm => ({
                                                    ...prev,
                                                    churchFrequency: newValue,
                                                }),
                                            );
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(() => newHover);
                                        }}
                                        className=" text-primary-600"
                                        name="closeness-rating"
                                        icon={
                                            <VscStarFull className="text-primary-500" />
                                        }
                                        emptyIcon={
                                            <VscStarEmpty className=" text-basic-500" />
                                        }
                                        value={form.churchFrequency}
                                    />
                                    <AiOutlineCheck
                                        onClick={() => {
                                            submitProfile(form);
                                        }}
                                        className="me-2  cursor-pointer rounded-sm bg-primary-500 p-[3px] text-basic-800 hover:bg-primary-600 "
                                    />
                                </div>
                            </>
                        ) : (
                            <HoverEdit
                                cursorHover={true}
                                editEvent={() => {
                                    setEditting(
                                        (): ProfileEditState => ({
                                            ...closedEdits,
                                            churchFrequency: true,
                                        }),
                                    );
                                }}
                                className="pe-10"
                            >
                                <span className="cursor-default">
                                    {user.churchFrequency ?? "Not provided"}
                                </span>
                            </HoverEdit>
                        )}
                    </div>
                    <div className="flex flex-row items-center justify-between py-2">
                        Church Satisfaction:
                        {editting.churchSatisfaction ? (
                            <>
                                {" "}
                                <div className="flex flex-row items-center gap-3">
                                    <Rating
                                        max={7}
                                        precision={1}
                                        onChange={(e, newValue) => {
                                            setForm(
                                                (prev): ProfileForm => ({
                                                    ...prev,
                                                    churchSatisfaction:
                                                        newValue,
                                                }),
                                            );
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(() => newHover);
                                        }}
                                        className=" text-primary-600"
                                        name="closeness-rating"
                                        icon={
                                            <VscStarFull className="text-primary-500" />
                                        }
                                        emptyIcon={
                                            <VscStarEmpty className=" text-basic-500" />
                                        }
                                        value={form.churchSatisfaction}
                                    />
                                    <AiOutlineCheck
                                        onClick={() => {
                                            submitProfile(form);
                                        }}
                                        className="me-2  cursor-pointer rounded-sm bg-primary-500 p-[3px] text-basic-800 hover:bg-primary-600 "
                                    />
                                </div>
                            </>
                        ) : (
                            <HoverEdit
                                cursorHover={true}
                                editEvent={() => {
                                    setEditting(
                                        (): ProfileEditState => ({
                                            ...closedEdits,
                                            churchSatisfaction: true,
                                        }),
                                    );
                                }}
                                className="pe-10"
                            >
                                <span className="cursor-default">
                                    {user.churchSatisfaction ?? "Not provided"}
                                </span>
                            </HoverEdit>
                        )}
                    </div>
                    <div className="flex flex-row items-center justify-between py-2">
                        Profile Visibility:
                        {editting.visible ? (
                            <>
                                <div className="flex flex-row items-center gap-3">
                                    <select
                                        className="rounded-md bg-basic-100 px-2 text-basic-900"
                                        name="denomination"
                                        id="select-denomination"
                                        defaultValue={"true"}
                                        onChange={(n) => {
                                            setForm(
                                                (prev): ProfileForm => ({
                                                    ...prev,
                                                    visible:
                                                        n.target.value == "true"
                                                            ? true
                                                            : false,
                                                }),
                                            );
                                        }}
                                        value={form.visible ? "true" : "false"}
                                    >
                                        <option value={undefined}></option>
                                        <option value={"true"}>Visible</option>
                                        <option value={"false"}>Hidden</option>
                                    </select>
                                    <AiOutlineCheck
                                        onClick={() => {
                                            submitProfile(form);
                                        }}
                                        className="me-2  cursor-pointer rounded-sm bg-primary-500 p-[3px] text-basic-800 hover:bg-primary-600 "
                                    />
                                </div>
                            </>
                        ) : (
                            <HoverEdit
                                cursorHover={true}
                                editEvent={() => {
                                    setEditting(
                                        (): ProfileEditState => ({
                                            ...closedEdits,
                                            visible: true,
                                        }),
                                    );
                                }}
                                className="pe-10"
                            >
                                <span className="cursor-default">
                                    {user.visible ? "Visible" : "Hidden"}
                                </span>
                            </HoverEdit>
                        )}
                    </div>
                </div>
            </div>
            <div className="border-t  border-basic-800 py-6">
                <h1 className="px-12 pb-2 text-2xl">Commentaries</h1>
                {commentariesLoading ? (
                    <Loading inline={false} />
                ) : (
                    <CommentaryList
                        sessionId={session.user.id}
                        userId={user.id}
                        commentaries={commentaries}
                    />
                )}
            </div>
        </PageBlock>
    );
};

const EditImagePopover = ({
    form,
    setForm,
}: {
    form: ProfileForm;
    setForm: React.Dispatch<React.SetStateAction<ProfileForm>>;
}) => {
    const handleUpload = () => {
        if (!form.image) return;
    };

    return (
        <div className="fixed left-0 top-0 z-10 h-screen w-screen  bg-basic-800 bg-opacity-70 px-3">
            <div className=" z-20 mx-auto mt-36 h-1/2 max-w-3xl rounded-lg bg-basic-600  p-4 shadow-lg shadow-basic-950">
                <input
                    title="Upload an Image"
                    placeholder="Upload"
                    type="file"
                    className="h-full w-full  bg-slate-50"
                    // onChange={(p) => {
                    //     console.log(p.target.value);
                    //     setForm((prev) => ({
                    //         ...prev,
                    //         image: p.target.files?.item(0) ?? null,
                    //     }));
                    //     handleUpload();
                    // }}
                />
            </div>
        </div>
    );
};

export default MyProfile;
