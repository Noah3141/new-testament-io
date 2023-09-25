import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import Button from "./Button";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { Commentary } from "@prisma/client";
import { VscEdit, VscTrash } from "react-icons/vsc";
import { NextRouter, useRouter } from "next/router";
import Loading from "./Loading";

type CommentaryWizardProps = {
    scriptureId: string;
};

type CommentarySubmitForm = {
    title: string;
    content: string;
    link: string;
    scriptureId: string;
};

const CommentaryWizard = ({ scriptureId }: CommentaryWizardProps) => {
    const router = useRouter();
    const trpcUtils = api.useContext();

    const [editting, setEditting] = useState(false);
    const [open, setOpen] = useState(false);
    const { data: session, status } = useSession();

    const deleteToastId = "deleteToastId";
    const { mutate: deleteCommentary, isLoading: deleteLoading } =
        api.commentary.deleteSessionUsersForScriptureId.useMutation({
            onMutate: () => {
                toast.loading("Deleting...", { id: deleteToastId });
            },
            onSuccess: async () => {
                await trpcUtils.commentary.invalidate();
                toast.success("Commentary removed!", {
                    id: deleteToastId,
                });
                setEditting(false);
                setOpen(false);
            },
            onError: () => {
                toast.error("Something went wrong!", { id: deleteToastId });
            },
        });

    const remove = (scriptureId: string) => {
        deleteCommentary({ scriptureId: scriptureId });
    };

    const submitToastId = "submitToastId";
    const { mutate: upsert, isLoading: submissionLoading } =
        api.commentary.upsert.useMutation({
            onMutate: () => {
                toast.loading("Submitting...", { id: submitToastId });
            },
            onSuccess: async () => {
                await trpcUtils.commentary.invalidate();
                if (editting) {
                    toast.success("Commentary updated!", { id: submitToastId });
                } else {
                    toast.success("Commentary submitted!", {
                        id: submitToastId,
                    });
                }
                setEditting(false);
                setOpen(false);
            },
            onError: () => {
                toast.error("Something went wrong!", { id: submitToastId });
            },
        });

    const submit = (form: CommentarySubmitForm) => {
        upsert(form);
    };

    const { data: usersCommentary, isLoading: commentaryLoading } =
        api.commentary.getSessionUsersForScriptureId.useQuery({
            scriptureId: scriptureId,
        });

    const [form, setForm] = useState<CommentarySubmitForm>({
        title: usersCommentary?.title ?? "",
        content: usersCommentary?.content ?? "",
        scriptureId: scriptureId,
        link: router.pathname,
    });

    if (status != "authenticated") {
        return (
            <div className="flex flex-row justify-end">
                <Button
                    onClick={() => {
                        void signIn();
                    }}
                    color="primary"
                >
                    Sign in
                </Button>
            </div>
        );
    }

    if (!!usersCommentary) {
        return (
            <CommentaryDisplay
                commentary={usersCommentary}
                {...{
                    scriptureId,
                    submissionLoading,
                    form,
                    setForm,
                    commentaryLoading,
                    editting,
                    setEditting,
                    setOpen,
                    open,
                    submit,
                    remove,
                    deleteToastId,
                }}
            />
        );
    }

    return (
        <CommentaryCreate
            {...{
                setForm,
                form,
                scriptureId,
                open,
                setOpen,
                submit,
                submissionLoading,
            }}
        />
    );
};

type CommentaryCreateProps = {
    scriptureId: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    form: CommentarySubmitForm;
    setForm: React.Dispatch<React.SetStateAction<CommentarySubmitForm>>;
    submissionLoading: boolean;
    submit: (form: CommentarySubmitForm) => void;
};

const CommentaryCreate = ({
    form,
    setForm,
    open,
    setOpen,
    submissionLoading,
    scriptureId,
    submit,
}: CommentaryCreateProps) => {
    return (
        <div className="flex flex-col">
            <Button
                color="basic"
                small={true}
                className={`self-end ${open ? "hidden" : "block"}`}
                onClick={() => setOpen(true)}
            >
                Add Commentary
            </Button>
            <div className={`${open ? "block" : "hidden"}`}>
                <form id={scriptureId}>
                    <textarea
                        className="mb-3 w-full rounded-sm bg-basic-200 p-1 px-3 text-basic-900 hover:cursor-text hover:outline hover:outline-2 hover:outline-primary-600 focus:outline-none"
                        placeholder="Enter a title for your commentary"
                        value={form.title}
                        rows={1}
                        onChange={(e) =>
                            setForm((s) => ({
                                ...s,
                                title: e.target.value,
                            }))
                        }
                    />
                    <textarea
                        className="w-full rounded-sm bg-basic-200 p-3 text-basic-900 hover:cursor-text hover:outline hover:outline-2 hover:outline-primary-600 focus:outline-none"
                        placeholder="Enter your interpretation of the text"
                        value={form.content}
                        rows={20}
                        onChange={(e) =>
                            setForm((s) => ({
                                ...s,
                                content: e.target.value,
                            }))
                        }
                    />
                    <div className="flex flex-row justify-between py-6">
                        <Button
                            className=""
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                submit(form);
                            }}
                            className="w-20"
                            color="primary"
                        >
                            {submissionLoading ? (
                                <Loading inline={true} />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

type CommentaryDisplayProps = {
    commentary: Commentary;
    editting: boolean;
    scriptureId: string;
    deleteToastId: string;
    submissionLoading: boolean;
    setEditting: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    form: CommentarySubmitForm;
    setForm: React.Dispatch<React.SetStateAction<CommentarySubmitForm>>;
    submit: (form: CommentarySubmitForm) => void;
    remove: (scriptureId: string) => void;
};

const CommentaryDisplay = ({
    commentary,
    scriptureId,
    submissionLoading,
    editting,
    setEditting,
    form,
    setForm,
    submit,
    remove,
    deleteToastId,
}: CommentaryDisplayProps) => {
    if (!editting) {
        return (
            <div>
                <div className="flex flex-row justify-between gap-2">
                    <Button
                        className="flex flex-row items-center gap-2"
                        onClick={(e) => {
                            e.preventDefault();
                            setEditting(true);
                            setForm((s) => ({
                                ...s,
                                content: commentary.content,
                                title: commentary.title,
                            }));
                        }}
                    >
                        Edit <VscEdit className="" />
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            toast((t) => {
                                return (
                                    <span className="text-center">
                                        Are you sure?
                                        <div className="flex flex-row gap-12 pt-3">
                                            <Button
                                                small={true}
                                                color="primary"
                                                onClick={() =>
                                                    toast.dismiss(t.id)
                                                }
                                            >
                                                ⛑️Cancel
                                            </Button>
                                            <Button
                                                small={true}
                                                color="primary"
                                                onClick={() => {
                                                    remove(scriptureId);
                                                    toast.dismiss(t.id);
                                                }}
                                            >
                                                Delete💣
                                            </Button>
                                        </div>
                                    </span>
                                );
                            });
                        }}
                        className="flex flex-row items-center gap-2"
                    >
                        Delete <VscTrash className="mt-1" />
                    </Button>
                </div>
                <div className="mb-6 py-12">
                    <h1 className="mb-3 text-2xl font-bold">
                        {commentary.title}
                    </h1>
                    <p className="whitespace-pre-wrap">{commentary.content}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <form id={scriptureId}>
                    <textarea
                        className="mb-3 w-full rounded-sm bg-basic-200 p-1 px-3 text-basic-900 hover:cursor-text hover:outline hover:outline-2 hover:outline-primary-600 focus:outline-none"
                        placeholder="Enter a title for your commentary"
                        value={form.title}
                        rows={1}
                        onChange={(e) =>
                            setForm((s) => ({
                                ...s,
                                title: e.target.value,
                            }))
                        }
                    />
                    <textarea
                        className="w-full rounded-sm bg-basic-200 p-3 text-basic-900 hover:cursor-text hover:outline hover:outline-2 hover:outline-primary-600 focus:outline-none"
                        placeholder="Enter your interpretation of the text"
                        value={form.content}
                        rows={20}
                        onChange={(e) =>
                            setForm((s) => ({
                                ...s,
                                content: e.target.value,
                            }))
                        }
                    />
                    <div className="flex flex-row justify-between py-6">
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                toast((t) => {
                                    return (
                                        <span className="cursor-default text-center text-primary-950">
                                            Are you sure?
                                            <div className="flex flex-row gap-6 pt-3">
                                                <Button
                                                    color="primary"
                                                    small={true}
                                                    onClick={() => {
                                                        setEditting(false);
                                                        toast.dismiss(t.id);
                                                    }}
                                                >
                                                    <span className="rounded-full bg-basic-800">
                                                        🫗
                                                    </span>{" "}
                                                    Scrap changes
                                                </Button>
                                                <Button
                                                    color="primary"
                                                    small={true}
                                                    onClick={() =>
                                                        toast.dismiss(t.id)
                                                    }
                                                >
                                                    Keep editting📝
                                                </Button>
                                            </div>
                                        </span>
                                    );
                                });
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                submit(form);
                            }}
                            className="w-20"
                            color="primary"
                        >
                            {submissionLoading ? (
                                <div className="flex w-full flex-row justify-center">
                                    <Oval
                                        height={"24"}
                                        width={"24"}
                                        color="#4fa94d"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel="oval-loading"
                                        secondaryColor="#4fa94d"
                                        strokeWidth={2}
                                        strokeWidthSecondary={2}
                                    />
                                </div>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
};

export default CommentaryWizard;
