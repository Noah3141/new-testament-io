import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Crumbtrail = () => {
    const router = useRouter();

    function titleCase(str: string) {
        const strs: string[] = str.split(" "); // Lowercase the phrase and give me an array of its words
        const exceptWords = ["of", "the", "through", "by", "in", "and", "as"];
        const upperCasedWords = strs.map((word) => {
            if (!exceptWords.includes(word)) {
                const upperCased = word.charAt(0).toUpperCase() + word.slice(1);
                return upperCased;
            } else {
                return word;
            }
        });

        return upperCasedWords.join(" "); // Restitch all the words into a single string again
    }

    const crumbs = router.pathname.split("/");
    let link = "/";
    return (
        <div className="flex flex-row border-b border-basic-800 px-12 py-2">
            {crumbs.map((crumb, i, crumbs) => {
                link += crumb + "/";
                crumb = crumb.replaceAll("-", " ");
                crumb = titleCase(crumb);
                if (i == 0) return;
                return (
                    <span key={i} className="pe-2">
                        <Link
                            className=" hover:text-primary-700"
                            href={`${link}`}
                        >
                            {crumb}{" "}
                        </Link>
                        {i < crumbs.length - 1 ? ">" : ""}
                    </span>
                );
            })}
        </div>
    );
};

export default Crumbtrail;
