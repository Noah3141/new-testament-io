import React from "react";
import { VscStarFull } from "react-icons/vsc";

type RatingLightProps = {
    ratingValue: number;
};

const RatingLight = ({ ratingValue }: RatingLightProps) => {
    const colorIndex = 9 - ratingValue;
    const colorClass = `text-primary-${colorIndex}00`;

    return (
        <span>
            <VscStarFull className={`${colorClass}`} />
        </span>
    );
};

export default RatingLight;
