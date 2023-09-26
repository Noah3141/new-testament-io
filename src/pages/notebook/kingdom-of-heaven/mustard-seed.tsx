import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 13:31-32";
    const title = "Like a Mustard Seed";
    const kjv = `
    31 Another parable put he forth unto them, saying, The kingdom of heaven is like to a grain of mustard seed, which a man took, and sowed in his field:

32 Which indeed is the least of all seeds: but when it is grown, it is the greatest among herbs, and becometh a tree, so that the birds of the air come and lodge in the branches thereof.

`;
    const lexham = "";
    const mounce = "";

    const id = "Like a Mustard Seed";
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
