import { type User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PageBlock from "~/components/Layouts/Page";
import ProfileImage from "~/components/ProfileImage";
import { api } from "~/utils/api";
import { showName } from "~/utils/tools";
import { useSession } from "next-auth/react";
import Loading from "~/components/Loading";
import WarningPage from "~/components/DefaultPages/WarningPage";

const UsersPage = () => {
    const { data: users, isLoading: usersLoading } = api.user.getAll.useQuery();
    const { data: session } = useSession();

    if (users?.length === 0) {
        return <WarningPage warning="No users found!😱" />;
    }

    return (
        <PageBlock>
            <h1 className="mb-6 px-12 text-2xl">Users</h1>
            <div>
                {usersLoading ? (
                    <Loading />
                ) : (
                    users?.map((user: User, i, users: User[]) => {
                        const ownUser = user.id === session?.user.id;
                        const link = ownUser
                            ? "/my-profile"
                            : `/user/${user.id}`;

                        return (
                            <div
                                key={i}
                                className="flex flex-row justify-between gap-2 border-y border-y-basic-800 px-12 py-2"
                            >
                                <Link
                                    className="flex flex-row gap-2 hover:text-primary-700"
                                    href={link}
                                >
                                    <ProfileImage
                                        src={user.image ?? undefined}
                                    />
                                    {showName(user)}
                                </Link>
                                <span>{user.rating ?? "No rating"}</span>
                            </div>
                        );
                    })
                )}
            </div>
        </PageBlock>
    );
};

export default UsersPage;
