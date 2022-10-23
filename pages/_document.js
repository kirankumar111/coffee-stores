import Document, { NextScript, Html, Main, Head } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        href="/fonts/IBMPlexSens-Bold.ttf"
                        rel="preload"
                        as="font"
                        crossOrigin="anonymous">
                    </link>
                    <link
                        href="/fonts/IBMPlexSens-Regular.ttf"
                        rel="preload"
                        as="font"
                        crossOrigin="anonymous">
                    </link>
                    <link
                        href="/fonts/IBMPlexSens-SemiBold.ttf"
                        rel="preload"
                        as="font"
                        crossOrigin="anonymous">
                    </link>
                </Head>
                <body>
                    <Main></Main>
                    <NextScript />
                </body>
            </Html >
        );
    }
}

export default MyDocument;