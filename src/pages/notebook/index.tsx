// Here we put the unifying skeleton for the folders.
// Essentially, table of contents page in Layout

import Link from "next/link";
import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import { useViewContext } from "~/server/contexts";

const NotebookPage = () => {
    const { viewing } = useViewContext();
    return (
        <Notebook>
            <div className="flex  flex-col gap-3 px-12 pt-6">
                <h1 className="text-5xl">Table of Contents</h1>
                <h2 className="text-3xl">The Gospel</h2>
                <h3 className="text-xl">
                    <Link href={`/notebook/kingdom-of-heaven?user=${viewing}`}>
                        {" "}
                        The Kingdom of Heaven
                    </Link>
                </h3>
                <h3 className="text-xl">
                    <Link
                        className="hidden"
                        href={`/notebook/sermon-on-the-mount?user=${viewing}`}
                    >
                        {" "}
                        The Sermon on the Mount
                    </Link>
                </h3>
            </div>
        </Notebook>
    );
};

export default NotebookPage;
