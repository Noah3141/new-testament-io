import React, { type ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Rightbar from "../Rightbar/Rightbar";

type NotebookProps = {
    children: ReactNode;
};

const Notebook = ({ children: children }: NotebookProps) => {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-row">
            <Sidebar />
            <div className="min-h-screen w-full max-w-7xl border-x border-basic-700">
                <div className="">{children}</div>
            </div>
            <Rightbar />
        </div>
    );
};

export default Notebook;
