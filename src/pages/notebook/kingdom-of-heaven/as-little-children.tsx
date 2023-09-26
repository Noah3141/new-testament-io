import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 18:1-5";
    const title = "Unless You Become as Little Children";
    const kjv = `
    1 At the same time came the disciples unto Jesus, saying, Who is the greatest in the kingdom of heaven?

    2 And Jesus called a little child unto him, and set him in the midst of them,
    
    3 And said, Verily I say unto you, Except ye be converted, and become as little children, ye shall not enter into the kingdom of heaven.
    
    4 Whosoever therefore shall humble himself as this little child, the same is greatest in the kingdom of heaven.
    
    5 And whoso shall receive one such little child in my name receiveth me.`;
    const lexham = "";
    const mounce = "";

    const id = "Unless You Become as Little Children";
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
