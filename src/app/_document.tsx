import Document, { Html, Head, Main, NextScript} from "next/document";

export default class CustomDocument extends Document {
    render() {
        return <Html>
            <Head>
                <meta property="custom" content="yolo" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    }
}