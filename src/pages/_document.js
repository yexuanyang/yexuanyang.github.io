import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="zh-CN">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;