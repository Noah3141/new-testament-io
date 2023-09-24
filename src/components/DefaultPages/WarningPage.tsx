import React from "react";
import PageBlock from "../Layouts/Page";

const WarningPage = ({ warning }: { warning: string }) => {
    return (
        <PageBlock>
            <div className="flex h-1/2 flex-row items-center justify-center px-12 text-2xl">
                🚧 {warning} 🚧
            </div>
        </PageBlock>
    );
};

export default WarningPage;
