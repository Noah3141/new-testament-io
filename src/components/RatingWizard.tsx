import { Rating } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscStarEmpty, VscStarFull } from "react-icons/vsc";
import { api } from "~/utils/api";

type RatingWizardProps = {
    authorId: string;
    raterId: string;
};

const label = (v: number | null): string => {
    switch (v) {
        case 1: // min
            return "Very poor";
        case 2:
            return "Poor";
        case 3:
            return "Not good";
        case 4: // midpoint
            return "Okay";
        case 5:
            return "Good";
        case 6:
            return "Great";
        case 7: // max
            return "Excellent";
        default:
            return "";
    }
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
    const ratingToastId = "ratingToastId";
    const { mutate: updateRating, isLoading: loadingRatingUpdate } =
        api.commentary.addRating.useMutation({
            onMutate: () => {
                toast.loading("Submitting rating...", { id: ratingToastId });
            },
            onSuccess: () => {
                toast.success("Rating submitted!", { id: ratingToastId });
            },
            onError: () => {
                toast.error("Something went wrong!", { id: ratingToastId });
            },
        });

    return (
        <div className="flex flex-col items-end px-12">
            <div className="pe-2">{ratings.comprehensive}</div>

            <div className="flex flex-row justify-end">
                <div className="pe-2">Comprehensive</div>
                <Rating
                    max={7}
                    precision={1}
                    onChange={(e, newValue) => {
                        console.log(ratings.comprehensive);
                        e.preventDefault();
                        setRatings((prev) => ({
                            ...prev,
                            comprehensive: newValue,
                        }));
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
                <span className={`w-20 text-start`}>
                    {label(hover.comprehensive)}
                </span>
            </div>

            <div className="flex flex-row justify-end">
                <div className="pe-2">Closeness</div>

                <Rating
                    max={7}
                    precision={1}
                    onChange={(e, newValue) => {
                        console.log(ratings.closeness);
                        e.preventDefault();
                        setRatings((prev) => ({
                            ...prev,
                            closeness: newValue,
                        }));
                        console.log(ratings.closeness);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover((prev) => ({
                            ...prev,
                            closeness: newHover,
                        }));
                    }}
                    className=" text-primary-600"
                    name="closeness-rating"
                    icon={<VscStarFull className="text-primary-500" />}
                    emptyIcon={<VscStarEmpty className=" text-basic-500" />}
                    value={ratings.closeness}
                />
                <span className={`w-20 text-start`}>
                    {label(hover.closeness)}
                </span>
            </div>
            <div className="flex flex-row justify-end">
                <div className="pe-2">Coherent</div>

                <Rating
                    max={7}
                    precision={1}
                    onChange={(e, newValue) => {
                        console.log(ratings.coherent);
                        e.preventDefault();
                        setRatings((prev) => ({
                            ...prev,
                            coherent: newValue,
                        }));
                        console.log(ratings.coherent);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover((prev) => ({
                            ...prev,
                            coherent: newHover,
                        }));
                    }}
                    className=" text-primary-600"
                    name="coherent-rating"
                    icon={<VscStarFull className="text-primary-500" />}
                    emptyIcon={<VscStarEmpty className=" text-basic-500" />}
                    value={ratings.coherent}
                />
                <span className={`w-20 text-start`}>
                    {label(hover.coherent)}
                </span>
            </div>

            <div className="flex flex-row justify-end">
                <div className="pe-2">Comprehensible</div>

                <Rating
                    max={7}
                    precision={1}
                    onChange={(e, newValue) => {
                        console.log(ratings.comprehensible);
                        e.preventDefault();
                        setRatings((prev) => ({
                            ...prev,
                            comprehensible: newValue,
                        }));
                        console.log(ratings.comprehensible);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover((prev) => ({
                            ...prev,
                            comprehensible: newHover,
                        }));
                    }}
                    className=" text-primary-600"
                    name="comprehensible-rating"
                    icon={<VscStarFull className="text-primary-500" />}
                    emptyIcon={<VscStarEmpty className=" text-basic-500" />}
                    value={ratings.comprehensible}
                />
                <span className={`w-20 text-start`}>
                    {label(hover.comprehensible)}
                </span>
            </div>

            <div className="flex flex-row justify-end">
                <div className="pe-2">Deep</div>

                <Rating
                    max={7}
                    precision={1}
                    onChange={(e, newValue) => {
                        console.log(ratings.deep);
                        e.preventDefault();
                        setRatings((prev) => ({
                            ...prev,
                            deep: newValue,
                        }));
                        console.log(ratings.deep);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover((prev) => ({
                            ...prev,
                            deep: newHover,
                        }));
                    }}
                    className=" text-primary-600"
                    name="deep-rating"
                    icon={<VscStarFull className="text-primary-500" />}
                    emptyIcon={<VscStarEmpty className=" text-basic-500" />}
                    value={ratings.deep}
                />
                <span className={`w-20 text-start`}>{label(hover.deep)}</span>
            </div>

            <div className="flex flex-row justify-end">
                <div className="pe-2">Practical</div>
                <Rating
                    max={7}
                    precision={1}
                    onChange={(e, newValue) => {
                        console.log(ratings.practical);
                        e.preventDefault();
                        setRatings((prev) => ({
                            ...prev,
                            practical: newValue,
                        }));
                        console.log(ratings.practical);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover((prev) => ({
                            ...prev,
                            practical: newHover,
                        }));
                    }}
                    className=" text-primary-600"
                    name="practical-rating"
                    icon={<VscStarFull className="text-primary-500" />}
                    emptyIcon={<VscStarEmpty className=" text-basic-500" />}
                    value={ratings.practical}
                />
                <span className={`w-20 text-start`}>
                    {label(hover.practical)}
                </span>
            </div>
        </div>
    );
};

export default RatingWizard;
