import { Commentary, CommentaryRating, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Button from "~/components/Button";
import WarningPage from "~/components/DefaultPages/WarningPage";
import PageBlock from "~/components/Layouts/Page";
import Loading from "~/components/Loading";
import ProfileImage from "~/components/ProfileImage";
import { api } from "~/utils/api";
import { dateTimeFormatter as dtf } from "~/utils/tools";

type UsersWithCommentariesAndTheirRatings = (User & {
    commentaries: (Commentary & { ratings: CommentaryRating[] })[];
})[];
type UserWithCommentariesAndTheirRatings = User & {
    commentaries: (Commentary & { ratings: CommentaryRating[] })[];
};

const SubscriptionsPage = () => {
    const { status } = useSession();
    const { data: subscriptions, isLoading: subscriptionLoading } =
        api.user.getSubscriptionsUsersWithRecentCommentary.useQuery();

    // Initialize a map for all the subscriptions, stating that their dropdowns are false (not expanded)
    const map = new Map();
    subscriptions?.map((sub) => map.set(sub.id, false));

    const [subscriptionDropdowns, setMap] = useState<Map<string, boolean>>(map);
    const toggleSubscriptionDropdown = (k: string) => {
        const exp = subscriptionDropdowns.get(k);
        setMap(new Map(subscriptionDropdowns.set(k, !exp)));
    };

    if (subscriptionLoading || status == "loading") {
        <PageBlock>
            <h1 className="mb-6 px-12 text-2xl">Subscriptions</h1>
            <Loading inline={false} />
        </PageBlock>;
    }

    if (status != "authenticated") {
        return (
            <WarningPage warning="You need to sign in to see subscriptions!" />
        );
    }

    if (!subscriptions && !subscriptionLoading) {
        return <WarningPage warning="Something went wrong!" />;
    }

    return (
        <PageBlock>
            <h1 className="mb-6 px-12 text-2xl">Subscriptions</h1>
            <div>
                {subscriptions?.map((subscription, i, subscriptions) => {
                    const expanded =
                        subscriptionDropdowns.get(subscription.id) ?? false;
                    return (
                        <div key={i}>
                            <div className="flex flex-row justify-between gap-2 border-y border-y-basic-800 px-12 py-2">
                                <Link
                                    className="flex flex-row gap-2 hover:text-primary-700"
                                    href={`/user/${subscription.id}`}
                                >
                                    <ProfileImage
                                        className="shrink-0"
                                        src={subscription.image ?? undefined}
                                    />
                                    {subscription.name}
                                </Link>
                                <div>
                                    <span>
                                        {subscription.rating ?? "No rating"}
                                    </span>
                                    <Button
                                        className="text-basic-900"
                                        small={true}
                                        onClick={() => {
                                            toggleSubscriptionDropdown(
                                                subscription.id,
                                            );
                                        }}
                                    >
                                        Posts
                                    </Button>
                                </div>
                            </div>
                            <SubscriptionRecentPosts
                                expanded={expanded}
                                authorId={subscription.id}
                                commentaries={subscription.commentaries}
                            />
                        </div>
                    );
                })}
            </div>
        </PageBlock>
    );
};

type SubscriptionRecentPostProps = {
    authorId: string;
    commentaries: (Commentary & { ratings: CommentaryRating[] })[];
    expanded: boolean;
};

const SubscriptionRecentPosts = ({
    expanded,
    commentaries,
    authorId,
}: SubscriptionRecentPostProps) => {
    return (
        <div
            className={`border-b border-b-basic-700 transition-all ${
                expanded ? "h-28 overflow-scroll " : "h-0 overflow-hidden"
            }`}
        >
            {commentaries.map((commentary, i) => {
                return (
                    <div
                        className="flex flex-col border-b border-y-basic-800 px-12 py-6"
                        key={i}
                    >
                        <div className="flex flex-row items-center justify-between">
                            <Link
                                href={`/${commentary.link}?user=${authorId}`}
                                className="text-2xl hover:text-primary-700"
                            >
                                {commentary.title}
                            </Link>
                            <span className="">
                                {dtf.format(commentary.createdAt)}
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

export default SubscriptionsPage;
