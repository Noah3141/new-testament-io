import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import WarningPage from "~/components/DefaultPages/WarningPage";
import PageBlock from "~/components/Layouts/Page";
import Loading from "~/components/Loading";
import ProfileImage from "~/components/ProfileImage";
import { api } from "~/utils/api";
import { showName } from "~/utils/tools";

const SubscriptionsPage = () => {
    const { data: subscriptions, isLoading: subscriptionLoading } =
        api.user.getSubscriptionsUsers.useQuery();
    const { status } = useSession();

    if (subscriptionLoading) {
        <PageBlock>
            <h1 className="mb-6 px-12 text-2xl">Subscriptions</h1>

            <Loading />
        </PageBlock>;
    }

    if (status != "authenticated") {
        return (
            <WarningPage warning="You need to sign in to see subscriptions!" />
        );
    }

    if (!subscriptions) {
        return <WarningPage warning="Something went wrong!" />;
    }

    return (
        <PageBlock>
            <h1 className="mb-6 px-12 text-2xl">Subscriptions</h1>
            <div>
                {subscriptions?.map(
                    (subscription: User, i, subscriptions: User[]) => {
                        return (
                            <div
                                key={i}
                                className="flex flex-row justify-between gap-2 border-y border-y-basic-800 px-12 py-2"
                            >
                                <Link
                                    className="flex flex-row gap-2 hover:text-primary-700"
                                    href={`/user/${subscription.id}`}
                                >
                                    <ProfileImage
                                        src={subscription.image ?? undefined}
                                    />
                                    {showName(subscription)}
                                </Link>
                                <span>
                                    {subscription.rating ?? "No rating"}
                                </span>
                            </div>
                        );
                    },
                )}
            </div>
        </PageBlock>
    );
};

export default SubscriptionsPage;
