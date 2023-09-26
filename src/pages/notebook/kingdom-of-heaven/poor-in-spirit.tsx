import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 5:3";
    const title = "Poor in Spirit";
    const kjv =
        "3 Blessed are the poor in spirit: for theirs is the kingdom of heaven.";
    const lexham = "";
    const mounce = "";

    const id = "Blessed are the poor in spirit";
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
