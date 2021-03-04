import "../styles/globals.css";
import { Provider } from "next-auth/client";
import Head from "next/head";
import GitHubIcon from "../svg/github.svg";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
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
      </Head>

      <Component {...pageProps} />

      <div className="relative h-1 mx-auto mt-20 pt-6">
        <div
          className="absolute px-5 inset-0 flex items-center"
          aria-hidden="true"
        >
          <div className="w-full max-w-screen-xl mx-auto border-t border-gray-200"></div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">
            My other projects
          </p>
          <div className="mt-6 grid grid-cols-2 gap-0.5 lg:mt-12">
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <a
                href="https://nextjsnews.com"
                target="_blank"
                rel="noopener"
                title="The Next.js Monthly Newsletter"
                className="sm:filter-grayscale sm:opacity-70 hover:opacity-100 hover:filter-none transition-all duration-200"
              >
                <img
                  className="max-h-12"
                  src="/nextjsnews.svg"
                  alt="Next.js News logo"
                />
              </a>
            </div>
            <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
              <a
                href="https://turnshift.app"
                target="_blank"
                rel="noopener"
                className="sm:filter-grayscale sm:opacity-70 hover:opacity-100 hover:filter-none transition-all duration-200"
                title="Automate Your Team Schedule with TurnShift"
              >
                <img
                  className="max-h-12"
                  src="/turnshift.svg"
                  alt="TurnShift logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pb-10 bg-white space-x-8 text-gray-500 ">
        <span>
          Made by{" "}
          <a
            href="https://twitter.com/vvoyer"
            target="_blank"
            rel="noopener"
            className="underline hover:no-underline hover:text-indigo-500"
          >
            @vvoyer
          </a>
        </span>
        <a
          href="https://github.com/vvo/sourcekarma"
          target="_blank"
          rel="noopener"
          className="underline hover:no-underline hover:text-indigo-500"
        >
          <GitHubIcon className="inline-block w-5 h-5 mr-1" />
          vvo/sourcekarma
        </a>
      </div>
    </Provider>
  );
}

export default MyApp;
