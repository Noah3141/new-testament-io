import React from "react";
import { Oval } from "react-loader-spinner";

type LoadingProps = {
    inline: boolean;
    size?: number;
};

const Loading = ({ inline, size }: LoadingProps) => {
    const def = inline ? 24 : 60;

    return (
        <div
            className={`flex ${
                inline ? "" : "h-96"
            } w-full flex-row items-center justify-center`}
        >
            <Oval
                height={size ?? def}
                width={size ?? def}
                color="#65a30d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    );
};

export default Loading;
