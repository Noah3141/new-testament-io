import { Commentary } from "@prisma/client";
import Link from "next/link";
import { useViewContext } from "~/server/contexts";
import { dateTimeFormatter as dtf } from "~/utils/tools";

type CommentaryListProps = {
    commentaries?: Commentary[] | null;
    userId: string;
    sessionId: string | undefined;
};

const CommentaryList = ({
    commentaries,
    userId: authorId,
    sessionId,
}: CommentaryListProps) => {
    const { viewing, setViewing } = useViewContext();

    if (!commentaries || commentaries.length === 0) {
        return <div className="px-12">No commentaries</div>;
    }
    return (
        <div className="">
            {commentaries.map((commentary, i) => {
                return (
                    <div
                        className="flex flex-col border-y border-y-basic-800 px-12 py-6"
                        key={i}
                    >
                        <div className="flex flex-row items-center justify-between">
                            <Link
                                onClick={() => {
                                    setViewing(commentary.authorId);
                                }}
                                href={`/${commentary.link}`}
                                className="text-2xl hover:text-primary-700"
                            >
                                {commentary.title}
                            </Link>
                            <span className="text-sm">
                                {dtf.format(commentary.createdAt)}
                            </span>
                        </div>

                        <p className="mt-3 line-clamp-3 text-ellipsis text-basic-50">
                            {commentary.content}
                        </p>
                        <div className="mt-3">
                            <h2 className="text-xl font-thin  text-secondary-300">
                                {commentary.scriptureTitle}:{" "}
                                {commentary.scriptureVerse}
                            </h2>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CommentaryList;
