import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>New Testament Notebook</title>
                <meta
                    name="description"
                    content="Create, save, compare interpretations of texts"
                />
                <link rel="icon" href="/favicon.ico" />{" "}
            </Head>
            <body className="bg-basic-900 text-primary-500">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
