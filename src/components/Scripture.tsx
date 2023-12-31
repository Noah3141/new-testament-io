import React, { ReactNode, useState } from "react";
import CommentaryWizard from "./CommentaryWizard";
import Crumbtrail from "./Crumbtrail";
import RatingLight from "./RatingLight";
import RatingWizard from "./RatingWizard";
import { signIn, useSession } from "next-auth/react";
import Button from "./Button";
import { useViewContext } from "~/server/contexts";
import Loading from "./Loading";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

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
    authorName?: string;
    scriptureId: string;
};

const Scripture = ({
    title,
    verse,
    scriptureId,
    kjvText = "Translation not yet entered",
    lexhamText = "Translation not yet entered",
    mounceText = "Translation not yet entered",
}: ScriptureProps) => {
    const { data: session, status } = useSession();
    const { viewing, setViewing } = useViewContext();
    const router = useRouter();
    if (typeof router.query.user == "string") {
        setViewing(router.query.user);
    }
    const { data: viewedCommentary, isLoading: viewedCommentaryLoading } =
        api.commentary.getForUserIdAndScriptureId.useQuery({
            authorId: viewing ?? "throw",
            scriptureId: scriptureId,
        });

    const [bibleTranslation, setBibleTranslation] = useState<Translation>(
        Translation.KJV,
    );

    if (typeof viewing == "string" && viewing !== session?.user.id) {
        // viewing someone else's

        return (
            <>
                <Crumbtrail />
                <TranslationSelector setTranslation={setBibleTranslation} />
                <div className="  pt-6 text-basic-100">
                    <h1 className="px-12 text-2xl font-bold">{title}</h1>
                    <h2 className="px-12 text-lg">{verse}</h2>
                    <div className="mb-6 border-b border-b-basic-800 px-12 py-6">
                        {bibleTranslation == Translation.KJV ? kjvText : ""}
                        {bibleTranslation == Translation.Lexham
                            ? lexhamText
                            : ""}
                        {bibleTranslation == Translation.Mounce
                            ? mounceText
                            : ""}
                    </div>
                    {status == "loading" ? (
                        <Loading inline={false} />
                    ) : !session ? (
                        <>
                            {viewedCommentaryLoading ? (
                                <Loading inline={false} />
                            ) : (
                                viewedCommentary && (
                                    <div className="mb-6 px-12 py-6">
                                        <h1 className="mb-3 text-2xl font-bold">
                                            {viewedCommentary.title}
                                        </h1>
                                        <p className="whitespace-pre-wrap">
                                            {viewedCommentary.content}
                                        </p>
                                    </div>
                                )
                            )}
                            <div className="flex flex-row justify-end px-12">
                                <Button
                                    onClick={() => {
                                        void signIn();
                                    }}
                                    color="primary"
                                >
                                    Sign in to rate
                                </Button>
                            </div>
                        </>
                    ) : viewedCommentary ? (
                        <>
                            <div className="mb-6 px-12 py-6">
                                <h1 className="mb-3 text-2xl font-bold">
                                    {viewedCommentary.title}
                                </h1>
                                <p className="whitespace-pre-wrap">
                                    {viewedCommentary.content}
                                </p>
                            </div>
                            <RatingWizard
                                scriptureId={scriptureId}
                                authorId={viewing}
                                raterId={session.user.id}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </>
        );
    }

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
                {!session ? (
                    <div className="flex flex-row justify-end">
                        <Button
                            onClick={() => {
                                void signIn();
                            }}
                            color="primary"
                        >
                            Sign in
                        </Button>
                    </div>
                ) : (
                    <CommentaryWizard
                        {...{
                            scriptureId,
                            scriptureTitle: title,
                            scriptureVerse: verse,
                        }}
                    />
                )}
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
