import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 13:45-46";
    const title = "Like A Man Seeking Pearls";
    const kjv = `
    45 Again, the kingdom of heaven is like unto a merchant man, seeking goodly pearls:

    46 Who, when he had found one pearl of great price, went and sold all that he had, and bought it.`;
    const lexham = "";
    const mounce = "";

    const id = title;
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
