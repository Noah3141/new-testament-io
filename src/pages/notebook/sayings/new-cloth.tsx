import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const kjv = (
        <span>
            “No one sews a patch of unshrunk cloth on an old garment, for the
            patch will pull away from the garment, making the tear worse.
            Neither do people pour new wine into old wineskins. If they do, the
            skins will burst; the wine will run out and the wineskins will be
            ruined. No, they pour new wine into new wineskins, and both are
            preserved.”
        </span>
    );

    const lexham = <span></span>;
    const mounce = ``;

    const id = "a patch of unshrunk cloth on an old garment";
    return (
        <Notebook>
            <Scripture
                title="Parable of New Cloth on Old Garment"
                verse="Matthew 9:16-17"
                lexhamText={lexham}
                kjvText={kjv}
                mounceText={mounce}
                scriptureId={id}
            />
        </Notebook>
    );
};

export default Index;
