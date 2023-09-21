import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginWizard = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <div>
                    <div>Signed in as {session.user.name}</div>
                    <div>
                        Sign out{" "}
                        <button
                            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                            onClick={() => void signOut()}
                        ></button>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <div>Not signed in</div>
                    <div>
                        Sign In
                        <button
                            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                            onClick={() => void signIn()}
                        ></button>
                    </div>
                </div>
            </>
        );
    }
};

export default LoginWizard;
