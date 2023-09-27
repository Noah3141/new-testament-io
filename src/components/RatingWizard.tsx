import { Rating } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscStarEmpty, VscStarFull } from "react-icons/vsc";
import { api } from "~/utils/api";
import Loading from "./Loading";
import Button from "./Button";

type RatingWizardProps = {
    authorId: string;
    raterId: string;
    scriptureId: string;
};

const label = (v: number | undefined): string => {
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
    comprehensive: number | undefined;
    // The interpretation is graspable with the mind
    comprehensible: number | undefined;
    // How far-fetched or how many leaps, how close does the interpretation stay to the text. Interpretation makes sense for the text even without other texts
    coherent: number | undefined;
    // Internally logically consistent and makes sense together
    closeness: number | undefined;
    // Can be put into action
    practical: number | undefined;
    // Demonstrates insight and a deepness of interpretation of the world and text
    deep: number | undefined;
};

const RatingWizard = ({
    raterId,
    authorId,
    scriptureId,
}: RatingWizardProps) => {
    const dataState = api.useContext();
    const { data: currentRatings, isLoading: currentRatingsLoading } =
        api.commentary.getRatingForAuthorIdSriptureIdbySessionId.useQuery({
            authorId: authorId,
            scriptureId: scriptureId,
        });

    const [ratings, setRatings] = useState<Ratings>({
        comprehensive: currentRatings?.comprehensive,
        comprehensible: currentRatings?.comprehensible,
        closeness: currentRatings?.closeness,
        coherent: currentRatings?.coherent,
        practical: currentRatings?.practical,
        deep: currentRatings?.deep,
    });
    const [hover, setHover] = useState<Ratings>({
        comprehensive: undefined,
        comprehensible: undefined,
        closeness: undefined,
        coherent: undefined,
        practical: undefined,
        deep: undefined,
    });
    const ratingToastId = "ratingToastId";
    const { mutate: updateRating, isLoading: loadingRatingUpdate } =
        api.commentary.addRating.useMutation({
            onMutate: () => {
                toast.loading("Submitting rating...", { id: ratingToastId });
            },
            onSuccess: async () => {
                toast.success("Ratings submitted!", { id: ratingToastId });
                await dataState.commentary.invalidate();
            },
            onError: (e) => {
                toast.error(`${e.message}`, { id: ratingToastId });
            },
        });

    if (authorId == raterId) {
        return;
    }

    if (currentRatingsLoading) {
        return (
            <div className="flex flex-row justify-end">
                <Loading inline={true} />;
            </div>
        );
    }

    return (
        <div className="flex flex-col items-end px-12">
            <div className="flex flex-row justify-end">
                <div className="pe-2">Comprehensive</div>
                <Rating
                    max={7}
                    defaultValue={ratings.comprehensive}
                    precision={1}
                    onChange={(e, newValue) => {
                        e.preventDefault();

                        if (!newValue) {
                            toast.error("You must select a value.");
                            return;
                        }
                        setRatings((prev) => ({
                            ...prev,
                            comprehensive: newValue,
                        }));
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
                    defaultValue={ratings.closeness}
                    onChange={(e, newValue) => {
                        e.preventDefault();
                        if (!newValue) {
                            toast.error("You must select a value.");
                        }
                        setRatings((prev) => ({
                            ...prev,
                            closeness: newValue ?? undefined,
                        }));
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
                    defaultValue={ratings.coherent}
                    onChange={(e, newValue) => {
                        e.preventDefault();
                        if (!newValue) {
                            toast.error("You must select a value.");
                        }
                        setRatings((prev) => ({
                            ...prev,
                            coherent: newValue ?? undefined,
                        }));
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
                    defaultValue={ratings.comprehensible}
                    onChange={(e, newValue) => {
                        e.preventDefault();
                        if (!newValue) {
                            toast.error("You must select a value.");
                        }
                        setRatings((prev) => ({
                            ...prev,
                            comprehensible: newValue ?? undefined,
                        }));
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
                    defaultValue={ratings.deep}
                    onChange={(e, newValue) => {
                        e.preventDefault();
                        if (!newValue) {
                            toast.error("You must select a value.");
                        }
                        setRatings((prev) => ({
                            ...prev,
                            deep: newValue ?? undefined,
                        }));
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
                    defaultValue={ratings.practical}
                    onChange={(e, newValue) => {
                        e.preventDefault();
                        if (!newValue) {
                            toast.error("You must select a value.");
                        }
                        setRatings((prev) => ({
                            ...prev,
                            practical: newValue ?? undefined,
                        }));
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
            <Button
                className="me-20 mt-6"
                onClick={() => {
                    updateRating({
                        authorId: authorId,
                        ratings: ratings,
                        scriptureId: scriptureId,
                    });
                }}
            >
                Submit Ratings
            </Button>
        </div>
    );
};

export default RatingWizard;
