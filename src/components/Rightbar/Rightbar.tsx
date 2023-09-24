import { useSession } from "next-auth/react";
import React from "react";
import { api } from "~/utils/api";

// type RightbarProps = {};

const Rightbar = ({}) => {
    const { data: session, status } = useSession();

    const signedIn = status == "authenticated";

    return <div>Status:{}</div>;
};

export default Rightbar;
