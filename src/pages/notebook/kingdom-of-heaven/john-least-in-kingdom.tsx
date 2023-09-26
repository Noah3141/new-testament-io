import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 11:11-15";
    const title = "Least in the Kingdom Greater than John";
    const kjv = `
        11 Verily I say unto you, Among them that are born of women there hath not risen a greater than John the Baptist: notwithstanding he that is least in the kingdom of heaven is greater than he.
        
        12 And from the days of John the Baptist until now the kingdom of heaven suffereth violence, and the violent take it by force.

        13 For all the prophets and the law prophesied until John.

        14 And if ye will receive it, this is Elias, which was for to come.

        15 He that hath ears to hear, let him hear.
        `;
    const lexham = "";
    const mounce = "";

    const id = "Least in the Kingdom Greater than John";
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
