import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 6:25-34";
    const title = "Seek First the Kingdom of God";
    const kjv = `25 Therefore I say unto you, Take no thought for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on. Is not the life more than meat, and the body than raiment?

    26 Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they?
    
    27 Which of you by taking thought can add one cubit unto his stature?
    
    28 And why take ye thought for raiment? Consider the lilies of the field, how they grow; they toil not, neither do they spin:
    
    29 And yet I say unto you, That even Solomon in all his glory was not arrayed like one of these.
    
    30 Wherefore, if God so clothe the grass of the field, which to day is, and to morrow is cast into the oven, shall he not much more clothe you, O ye of little faith?
    
    31 Therefore take no thought, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed?
    
    32 (For after all these things do the Gentiles seek:) for your heavenly Father knoweth that ye have need of all these things.
    
    33 But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.
    
    34 Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.
    `;
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
