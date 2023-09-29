import Link from "next/link";
import { GetServerSideProps } from "next/types";
import React from "react";
import Notebook from "~/components/Layouts/Notebook";

const KingdomOfHeaven = () => {
    return (
        <Notebook>
            <div className="flex flex-col gap-3 px-12 pt-6 text-2xl">
                <h1 className="mb-3 text-4xl">The Kingdom of Heaven</h1>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/as-little-children`}
                >
                    Unless You Become as Little Children
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/a-net-cast-into-sea`}
                >
                    Like a Net Cast into Sea
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/east-and-west`}
                >
                    Many Shall Come From East & West
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/exceed-the-scribes`}
                >
                    Righteousness Exceeding the Scribes & Pharisees
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/great-pearls`}
                >
                    Like A Man Seeking Pearls
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/john-least-in-kingdom`}
                >
                    Least in the Kingdom Greater than John
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/leaven-the-whole`}
                >
                    Like unto Leaven
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/mustard-seed`}
                >
                    Like a Mustard Seed
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/not-all-who-say`}
                >
                    Not All Who Cry &quot;Lord, Lord!&quot;
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/persecuted`}
                >
                    Persecuted for Righteousness&rsquo; Sake
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/poor-in-spirit`}
                >
                    Poor in Spirit
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/seek-first-the-kingdom`}
                >
                    Seek First the Kingdom of God
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/sowing-good-seed`}
                >
                    Wheat Among Weeds
                </Link>
                <Link
                    className="text-primary-500 hover:text-primary-600"
                    href={`/notebook/kingdom-of-heaven/treasure-in-a-field`}
                >
                    Like Treasure in a Field
                </Link>
            </div>
        </Notebook>
    );
};

export default KingdomOfHeaven;
