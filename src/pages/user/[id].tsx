import { Rating } from "@mui/material";
import { Commentary } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { VscStarEmpty, VscStarFull } from "react-icons/vsc";
import { Discuss, Oval } from "react-loader-spinner";
import Button from "~/components/Button";
import CommentaryList from "~/components/CommentaryList";
import WarningPage from "~/components/DefaultPages/WarningPage";
import PageBlock from "~/components/Layouts/Page";
import Loading from "~/components/Loading";
import ProfileImage from "~/components/ProfileImage";
import { api } from "~/utils/api";

const UserProfilePage = () => {
    const trpcUtils = api.useContext();
    const router = useRouter();
    const { data: session, status } = useSession();
    const routeUserId =
        typeof router.query.id == "string" ? router.query.id : undefined;

    const { data: userForPage, isLoading: userForPageLoading } =
        api.user.getbyId.useQuery({
            userId: routeUserId,
        });

    const subscribingToastId = "subscribingToastId";
    const {
        mutate: toggleSubscribe,
        data: subscribedStates,
        isLoading: toggleSubscribeLoading,
    } = api.user.toggleSubscribeForSessionToUserId.useMutation({
        onMutate: () => {
            toast.loading("🪺", { id: subscribingToastId });
        },
        onSuccess: async ({ subscriptionNow }) => {
            await trpcUtils.user.invalidate();

            if (subscriptionNow) {
                toast.success("Subscribed!🕊️", {
                    id: subscribingToastId,
                });
            } else {
                toast.success("Unsubscribed!🕊️", {
                    id: subscribingToastId,
                });
            }
        },
        onError: () => {
            toast.error("Something went wrong! 🪹", {
                id: subscribingToastId,
            });
        },
    });

    const { data: subscriptionData } = api.user.isSubscribedToId.useQuery({
        subscribeToId: routeUserId,
    });

    const { data: commentaries, isLoading: commentariesLoading } =
        api.commentary.getAllByUserId.useQuery({
            userId: routeUserId,
        });

    if (userForPageLoading) {
        return (
            <PageBlock>
                <div className="flex flex-row justify-center">
                    <Oval
                        height={36}
                        width={36}
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
            </PageBlock>
        );
    }

    if (!userForPage || !routeUserId) {
        return (
            <WarningPage warning="This doesn't appear to be a user's page!" />
        );
    }

    const signedIn = status == "authenticated";
    const isSessionsOwnPage = userForPage.id === session?.user.id;

    return (
        <PageBlock>
            <div className="flex flex-row items-center justify-between px-12 ">
                <h1 className="mb-6 flex flex-row items-center gap-2 text-4xl">
                    <div>
                        <ProfileImage
                            size={42}
                            src={userForPage.image ?? undefined}
                        />
                    </div>
                    {userForPage.name}
                </h1>
                <div className="flex flex-row items-center gap-6 text-basic-50">
                    {userForPage.rating ? (
                        <Rating
                            name="read-only"
                            value={userForPage.rating}
                            precision={1}
                            readOnly
                            className=" text-primary-600"
                            icon={<VscStarFull className="text-primary-500" />}
                            emptyIcon={
                                <VscStarEmpty className=" text-basic-500" />
                            }
                        />
                    ) : (
                        "No rating"
                    )}

                    {!isSessionsOwnPage && signedIn && (
                        <Button
                            onClick={() => {
                                toggleSubscribe({
                                    subscribeToId: routeUserId,
                                });
                            }}
                            small={true}
                        >
                            {toggleSubscribeLoading ? (
                                <Loading inline={true} />
                            ) : subscriptionData &&
                              subscriptionData.subscribed ? (
                                "Unsubscribe"
                            ) : (
                                "Subscribe"
                            )}
                        </Button>
                    )}
                </div>
            </div>
            <div>
                {commentariesLoading ? (
                    <div className="flex h-40 w-full flex-row items-center justify-center">
                        <Discuss
                            visible={commentariesLoading}
                            height="80"
                            width="80"
                            ariaLabel="comment-loading"
                            wrapperStyle={{}}
                            wrapperClass="comment-wrapper"
                            colors={["#84cc16", "#84cc16"]}
                        />
                    </div>
                ) : (
                    <CommentaryList
                        {...{
                            userId: routeUserId,
                            commentaries,
                            sessionId: session?.user.id,
                        }}
                    />
                )}
            </div>
        </PageBlock>
    );
};

export default UserProfilePage;
