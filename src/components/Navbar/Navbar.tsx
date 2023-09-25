import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { VscSignIn, VscSignOut, VscAccount } from "react-icons/vsc";
import { useViewContext } from "~/server/contexts";

// type NavbarProps = {

// }

const Navbar = () => {
    const { data: session, status } = useSession();

    const { viewing, setViewing } = useViewContext();
    const signedIn = status == "authenticated";

    return (
        <div className="flex flex-row justify-end gap-6 border-b border-basic-700 px-12 py-4">
            <Link
                href={"/notebook"}
                onClick={() => {
                    setViewing(session?.user.id ?? null);
                }}
                className="whitespace-nowrap hover:text-primary-700"
            >
                My Notebook
            </Link>
            <Link
                href={"/statistics"}
                className="whitespace-nowrap hover:text-primary-700"
            >
                Stats
            </Link>
            <Link
                className="whitespace-nowrap hover:text-primary-700"
                href={"/users"}
            >
                Users
            </Link>
            {signedIn ? (
                <>
                    <Link
                        className="whitespace-nowrap hover:text-primary-700"
                        href={"/subscriptions"}
                    >
                        My Subscriptions
                    </Link>
                    <Link
                        href={"/my-profile"}
                        className="flex flex-row items-center gap-2 whitespace-nowrap hover:text-primary-700"
                    >
                        {session?.user.name} <VscAccount className="mt-1" />
                    </Link>
                    <div className="whitespace-nowrap hover:text-primary-700">
                        <button
                            className="flex flex-row items-center gap-2"
                            onClick={() => {
                                void signOut();
                            }}
                        >
                            Sign out <VscSignOut className="mt-1" />
                        </button>
                    </div>
                </>
            ) : (
                <div className="whitespace-nowrap hover:text-primary-700">
                    <button
                        className="flex flex-row gap-2"
                        onClick={() => {
                            void signIn();
                        }}
                    >
                        Sign in
                        <VscSignIn className="mt-1" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;

//todo) texts
//todo) Leaderboard link
//todo) My Profile link or Sign In or Sign Up [SIGN IN STATE]

//todo) In texts:
//! SIDEBAR
//todo) Sermon On the Mount link --> Own Sidebar Title and Subdropdowns
//todo) Symbolism laden phrases  --> Own Sidebar Title and Subdropdowns
//todo) Parables                --> Own Sidebar Title and Subdropdowns
//todo) Kingdom of Heaven       --> Own Sidebar Title and Subdropdowns
//! SUBNAV
//todo) Your Notebook vs {User}'s Notebook vs (either nothing or maybe a sign up suggestion for not signed in) [VEIW STATE]
// Signed out looking at Raw
// Signed out looking at User's
// Signed in looking at mine
// Signed in looking at User's

// Sign in state   --vs--     Viewing state
