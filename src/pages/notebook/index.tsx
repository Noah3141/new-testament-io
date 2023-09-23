// Here we put the unifying skeleton for the folders.
// Essentially, table of contents page in Layout

import React from "react";
import Notebook from "~/components/Layouts/Notebook";

const NotebookPage = () => {
    return (
        <Notebook>
            <div className="flex  flex-col gap-3 px-12 pt-6">
                <h1 className="text-5xl">Table of Contents</h1>
                <h2 className="text-3xl">The Gospel</h2>
                <span>
                    The Gospel texts parsed into non-overlapping categories.
                    This section contains one instance of each scripture for
                    each gospel, where scriptures that are found in multiple
                    gospels with only small differences are synced.
                </span>
                <h3 className="text-xl">The Sermon on the Mount</h3>
                <h3 className="text-xl">The Kingdom of Heaven</h3>
                <h3 className="text-xl">Parables</h3>
                <h3 className="text-xl">Sayings</h3>

                <h2 className="text-3xl">Other categories</h2>
                <span>
                    The Gospel texts broken down into categories. These sections
                    are overlapping and non-comprehensive.
                </span>
                <h3 className="text-xl">Symbolism of Fire</h3>
                <h3 className="text-xl">Symbolism of Water</h3>
                <h3 className="text-xl">Symbolism of Air</h3>
                <h3 className="text-xl">Interactions with Pharisees</h3>
            </div>
        </Notebook>
    );
};

export default NotebookPage;
