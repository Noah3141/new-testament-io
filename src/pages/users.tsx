import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PageBlock from "~/components/Layouts/Page";
import ProfileImage from "~/components/ProfileImage";
import { api } from "~/utils/api";
import { Oval } from "react-loader-spinner";
import { showName } from "~/utils/tools";

const UsersPage = () => {
    const { data: users, isLoading: usersLoading } = api.user.getAll.useQuery();

    return (
        <PageBlock>
            <h1 className="mb-6 px-12 text-2xl">Users</h1>
            <div>
                {usersLoading ? (
                    <div className="flex w-full flex-row justify-center">
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
                ) : (
                    users?.map((user: User, i, users: User[]) => {
                        return (
                            <div
                                key={i}
                                className="flex flex-row justify-between gap-2 border-y border-y-basic-800 px-12 py-2"
                            >
                                <Link
                                    className="flex flex-row gap-2 hover:text-primary-700"
                                    href={`/user/${user.id}`}
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
