import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 5:19";
    const title = "Least in the Kingdom of Heaven";
    const kjv =
        "19 Whosoever therefore shall break one of these least commandments, and shall teach men so, he shall be called the least in the kingdom of heaven: but whosoever shall do and teach them, the same shall be called great in the kingdom of heaven.";
    const lexham = "";
    const mounce = "";

    const id = "therefore shall break one of these least commandments";
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
