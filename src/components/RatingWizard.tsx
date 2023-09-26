import { Rating } from "@mui/material";
import React, { useState } from "react";
import { VscStarEmpty, VscStarFull } from "react-icons/vsc";

type RatingWizardProps = {
    authorId: string;
    raterId: string;
};

type Ratings = {
    // Includes all texts in framework
    comprehensive: number | null;
    // The interpretation is graspable with the mind
    comprehensible: number | null;
    // How far-fetched or how many leaps, how close does the interpretation stay to the text. Interpretation makes sense for the text even without other texts
    coherent: number | null;
    // Internally logically consistent and makes sense together
    closeness: number | null;
    // Can be put into action
    practical: number | null;
    // Demonstrates insight and a deepness of interpretation of the world and text
    deep: number | null;
};

const RatingWizard = ({ raterId, authorId }: RatingWizardProps) => {
    const [ratings, setRatings] = useState<Ratings>({
        comprehensive: null,
        comprehensible: null,
        closeness: null,
        coherent: null,
        practical: null,
        deep: null,
    });
    const [hover, setHover] = useState<Ratings>({
        comprehensive: null,
        comprehensible: null,
        closeness: null,
        coherent: null,
        practical: null,
        deep: null,
    });

    return (
        <div className="px-12">
            <Rating
                max={7}
                precision={1}
                onChange={(e, newValue) => {
                    e.preventDefault();
                    setRatings((prev) => ({
                        ...prev,
                        comprehensive: newValue,
                    }));
                    console.log(ratings.comprehensible);
                    console.log(ratings.comprehensive);
                }}
                onChangeActive={(event, newHover) => {
                    setHover((prev) => ({
                        ...prev,
                        comprehensive: newHover,
                    }));
                }}
                className=" text-primary-600"
                name="comprehensive-rating"
                icon={<VscStarFull className="text-primary-500" />}
                emptyIcon={<VscStarEmpty className=" text-basic-500" />}
                value={ratings.comprehensive}
            />
        </div>
    );
};

export default RatingWizard;
