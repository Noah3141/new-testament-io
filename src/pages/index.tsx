/// Page used to Introduce the idea of the site
/// Navbar visible

import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
    const hello = api.example.hello.useQuery({ text: "from tRPC" });

    return (
        <>
            <Head></Head>
            <main className=" flex min-h-screen flex-col items-center justify-center"></main>
        </>
    );
}
