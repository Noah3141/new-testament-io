import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 13:33";
    const title = "Like unto Leaven";
    const kjv = `33 Another parable spake he unto them; The kingdom of heaven is like unto leaven, which a woman took, and hid in three measures of meal, till the whole was leavened.`;
    const lexham = "";
    const mounce = "";

    const id = "Like unto Leaven";
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
