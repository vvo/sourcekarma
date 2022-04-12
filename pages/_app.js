import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          as="font"
          crossOrigin="anonymous"
          href="/Inter.var.woff2"
          rel="preload"
          type="font/woff2"
        />
      </Head>
      <div className="text-center font-bold py-4 text-xl bg-red-200 my-10">
        SourceKarma is currently disabled as I have no time to maintain it. If
        you want to maintain this project,{" "}
        <a href="https://twitter.com/vvoyer" className="underline">
          let me know
        </a>
        !
      </div>
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
