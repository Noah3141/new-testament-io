import React, { ReactNode, useState } from "react";
import CommentaryWizard from "./CommentaryWizard";
import Crumbtrail from "./Crumbtrail";

enum Translation {
    KJV,
    Lexham,
    Mounce,
}

type ScriptureProps = {
    title: string;
    kjvText?: ReactNode;
    mounceText?: ReactNode;
    lexhamText?: ReactNode;
    verse: string;
    scriptureId: string;
    authorName?: string;
};

const Scripture = ({
    title,
    verse,
    scriptureId,
    kjvText = "Translation not yet entered",
    lexhamText = "Translation not yet entered",
    mounceText = "Translation not yet entered",
}: ScriptureProps) => {
    const [bibleTranslation, setBibleTranslation] = useState<Translation>(
        Translation.KJV,
    );

    return (
        <>
            <Crumbtrail />
            <TranslationSelector setTranslation={setBibleTranslation} />
            <div className="px-12  pt-6 text-basic-100">
                <h1 className="text-2xl font-bold">{title}</h1>
                <h2 className="text-lg">{verse}</h2>
                <div className="mb-6 border-b border-b-basic-800 py-6">
                    {bibleTranslation == Translation.KJV ? kjvText : ""}
                    {bibleTranslation == Translation.Lexham ? lexhamText : ""}
                    {bibleTranslation == Translation.Mounce ? mounceText : ""}
                </div>
                <CommentaryWizard {...{ scriptureId }} />
            </div>
        </>
    );
};

type TranslationSelectorProps = {
    setTranslation: React.Dispatch<React.SetStateAction<Translation>>;
};
const TranslationSelector = ({ setTranslation }: TranslationSelectorProps) => {
    return (
        <div className="flex w-full flex-row gap-5 border-b border-b-basic-800  px-12 py-1">
            <span
                onClick={() => {
                    setTranslation(Translation.KJV);
                }}
                className="cursor-pointer border-b-2 border-transparent text-primary-600 hover:border-primary-700 hover:text-primary-700"
            >
                KJV
            </span>
            <span
                onClick={() => {
                    setTranslation(Translation.Lexham);
                }}
                className="cursor-pointer border-b-2 border-transparent text-primary-600 hover:border-primary-700 hover:text-primary-700"
            >
                LEXHAM
            </span>
            <span
                onClick={() => {
                    setTranslation(Translation.Mounce);
                }}
                className="cursor-pointer border-b-2 border-transparent text-primary-600 hover:border-primary-700 hover:text-primary-700"
            >
                MOUNCE
            </span>
        </div>
    );
};

export default Scripture;
