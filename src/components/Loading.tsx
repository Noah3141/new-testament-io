import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="flex h-96 w-full flex-row justify-center">
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
    );
};

export default Loading;
