import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 13:44";
    const title = "Like Treasure in a Field";
    const kjv =
        "44 Again, the kingdom of heaven is like unto treasure hid in a field; the which when a man hath found, he hideth, and for joy thereof goeth and selleth all that he hath, and buyeth that field.";
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
