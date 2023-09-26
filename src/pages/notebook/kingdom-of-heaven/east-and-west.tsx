import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 8:11-12";
    const title = "Many Shall Come From East & West";
    const kjv = `11 And I say unto you, That many shall come from the east and west, and shall sit down with Abraham, and Isaac, and Jacob, in the kingdom of heaven.

    12 But the children of the kingdom shall be cast out into outer darkness: there shall be weeping and gnashing of teeth.`;
    const lexham = "";
    const mounce = "";

    const id = "many shall come from the east and west";
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
