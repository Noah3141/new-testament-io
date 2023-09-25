import React from "react";
import { useViewContext } from "~/server/contexts";
import { api } from "~/utils/api";

// type RightbarProps = {};

const Rightbar = ({}) => {
    const { viewing, setViewing } = useViewContext();
    const { data: viewedUser, isLoading } = api.user.getbyId.useQuery({
        userId: viewing ?? undefined,
    });

    if (!viewedUser) {
        return <div>foo</div>;
    }

    const label = viewedUser.name;

    return (
        <div className="max-w-xs overflow-hidden truncate whitespace-pre-wrap  px-6 pt-6">
            <div>Notebook:</div>
            {label}
        </div>
    );
};

export default Rightbar;
