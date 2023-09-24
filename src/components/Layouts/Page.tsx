import React, { type ReactNode } from "react";

type PageProps = {
    children: ReactNode;
};

const PageBlock = ({ children: children }: PageProps) => {
    return (
        <div className="mx-auto flex w-full max-w-3xl flex-row ">
            <div className="min-h-screen w-full max-w-3xl border-x border-basic-700 pt-6">
                {children}
            </div>
        </div>
    );
};

export default PageBlock;
