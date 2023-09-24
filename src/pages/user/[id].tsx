import { Commentary } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Discuss, Oval } from "react-loader-spinner";
import Button from "~/components/Button";
import WarningPage from "~/components/DefaultPages/WarningPage";
import PageBlock from "~/components/Layouts/Page";
import ProfileImage from "~/components/ProfileImage";
import { api } from "~/utils/api";
import { dateTimeFormatter, showName } from "~/utils/tools";

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

    const { mutate: toggleSubscribe, data: subscribedStates } =
        api.user.toggleSubscribeForSessionToUserId.useMutation({
            onMutate: () => {
                console.log();
            },
            onSuccess: async () => {
                await trpcUtils.user.invalidate();
            },
            onError: () => {
                console.log();
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
                    {showName(userForPage)}
                </h1>
                <div className="flex flex-row items-center gap-6 text-basic-50">
                    {userForPage.rating ?? "No rating"}

                    {(!isSessionsOwnPage && signedIn) ?? (
                        <Button
                            onClick={() => {
                                toggleSubscribe({
                                    subscribeToId: routeUserId,
                                });
                            }}
                            small={true}
                        >
                            {subscriptionData && subscriptionData.subscribed
                                ? "Unsubscribe"
                                : "Subscribe"}
                        </Button>
                    )}
                </div>
            </div>
            <div>
                {commentariesLoading ? (
                    <Discuss
                        visible={commentariesLoading}
                        height="80"
                        width="80"
                        ariaLabel="comment-loading"
                        wrapperStyle={{}}
                        wrapperClass="comment-wrapper"
                        colors={["#ff727d", "#ff727d"]}
                    />
                ) : (
                    <CommentaryList
                        {...{ userId: routeUserId, commentaries }}
                    />
                )}
            </div>
        </PageBlock>
    );
};

type CommentaryListProps = {
    commentaries?: Commentary[] | null;
    userId: string;
};

const CommentaryList = ({ commentaries, userId }: CommentaryListProps) => {
    if (!commentaries || commentaries.length === 0) {
        return <div className="px-12">No commentaries</div>;
    }
    return (
        <div className="">
            {commentaries.map((commentary, i) => {
                console.log(commentary.link);

                return (
                    <div
                        className="flex flex-col border-y border-y-basic-800 px-12 py-6"
                        key={i}
                    >
                        <div className="flex flex-row items-center justify-between">
                            <Link
                                href={`/${commentary.link}?user=${userId}`}
                                className="text-2xl hover:text-primary-700"
                            >
                                {commentary.title}
                            </Link>
                            <span className="">
                                {dateTimeFormatter.format(commentary.createdAt)}
                            </span>
                        </div>
                        <p className="mt-3 line-clamp-3 text-ellipsis text-basic-50">
                            {commentary.content}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default UserProfilePage;
