import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 13:47-50";
    const title = "Like a Net Cast into Sea";
    const kjv = `
    47 Again, the kingdom of heaven is like unto a net, that was cast into the sea, and gathered of every kind:

    48 Which, when it was full, they drew to shore, and sat down, and gathered the good into vessels, but cast the bad away.

    49 So shall it be at the end of the world: the angels shall come forth, and sever the wicked from among the just,

    50 And shall cast them into the furnace of fire: there shall be wailing and gnashing of teeth.`;
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
