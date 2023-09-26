import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 5:10";
    const title = "Persecuted for Righteousness' Sake";
    const kjv =
        "10 Blessed are they which are persecuted for righteousness' sake: for theirs is the kingdom of heaven.";
    const lexham = "";
    const mounce = "";

    const id = "Blessed are they which are persecuted for righteousness' sake";
    return (
        <Notebook>
            <Scripture
                title={title}
                verse={verse}
                lexhamText={lexham}
                kjvText={kjv}
                mounceText={mounce}
                scriptureId={id}
            />
        </Notebook>
    );
};

export default Index;
