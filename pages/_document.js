import Document, { NextScript, Html, Main, Head } from "next/document";
import Link from "next/link";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <Link
                        href="/fonts/IBMPlexSens-Bold.ttf"
                        rel="preload"
                        as="font"
                        crossOrigin="anonymous">
                        <a></a>
                    </Link>
                    <Link
                        href="/fonts/IBMPlexSens-Regular.ttf"
                        rel="preload"
                        as="font"
                        crossOrigin="anonymous">
                        <a></a>
                    </Link>
                    <Link
                        href="/fonts/IBMPlexSens-SemiBold.ttf"
                        rel="preload"
                        as="font"
                        crossOrigin="anonymous">
                        <a></a>
                    </Link>
                </Head>
                <body>
                    <Main></Main>
                    <NextScript/>
                </body>
            </Html >
        );
    }
}

export default MyDocument;