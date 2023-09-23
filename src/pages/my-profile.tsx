import { useSession } from "next-auth/react";
import React from "react";
import ProfileImage from "~/components/ProfileImage";

const MyProfile = () => {
    const { data: session, status } = useSession();

    if (status != "authenticated") {
        return <div>You must be signed in to see your profile.</div>;
    }

    return (
        <div>
            <ProfileImage src={session.user.image ?? undefined} />
        </div>
    );
};

export default MyProfile;
