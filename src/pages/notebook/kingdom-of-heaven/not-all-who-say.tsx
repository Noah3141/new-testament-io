import React from "react";
import Notebook from "~/components/Layouts/Notebook";
import Scripture from "~/components/Scripture";

const Index = () => {
    const verse = "Matthew 7:21";
    const title = `Not All Who Cry "Lord, Lord!"`;
    const kjv = `
        16 Ye shall know them by their fruits. Do men gather grapes of thorns, or figs of thistles?

        17 Even so every good tree bringeth forth good fruit; but a corrupt tree bringeth forth evil fruit.
        
        18 A good tree cannot bring forth evil fruit, neither can a corrupt tree bring forth good fruit.
        
        19 Every tree that bringeth not forth good fruit is hewn down, and cast into the fire.
        
        20 Wherefore by their fruits ye shall know them.
        
        21 Not every one that saith unto me, Lord, Lord, shall enter into the kingdom of heaven; but he that doeth the will of my Father which is in heaven.
        
        22 Many will say to me in that day, Lord, Lord, have we not prophesied in thy name? and in thy name have cast out devils? and in thy name done many wonderful works?
        
        23 And then will I profess unto them, I never knew you: depart from me, ye that work iniquity.`;
    const lexham = "";
    const mounce = "";

    const id = "Not every one that saith unto me, Lord, Lord,";
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
