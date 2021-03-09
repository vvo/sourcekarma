import * as Fathom from "fathom-client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GitHubIcon from "../../svg/github.svg";
import ChartSquareBarIcon from "../../svg/chart-square-bar.svg";
import { Provider } from "next-auth/client";

export default function PageLayout({ children, ...pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load("WQAQJZZG", {
      includedDomains: ["sourcekarma.vercel.app"],
      url: "https://rhinoceros.codeagain.com/script.js",
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  });

  return (
    <Provider session={pageProps.session}>
      <div className="flex justify-center mt-10">
        <a
          href="https://www.producthunt.com/posts/source-karma?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-source-karma"
          target="_blank"
          rel="noopener"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=287551&theme=light"
            alt="Source Karma - Discover how people react to you on GitHub | Product Hunt"
            style={{ width: "250px", height: "54px" }}
            width="250"
            height="54"
          />
        </a>
      </div>
      {children}
      <div className="relative h-1 mx-auto mt-12 sm:mt-20 pt-6">
        <div
          className="absolute px-5 inset-0 flex items-center"
          aria-hidden="true"
        >
          <div className="w-full max-w-screen-xl mx-auto border-t border-gray-200"></div>
        </div>
      </div>

      <div className="text-center mt-12 bg-white space-x-4 sm:space-x-8 text-gray-500 text-sm sm:text-base leading-8">
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
        <br className="sm:hidden" />
        <a
          href="https://usefathom.com/ref/Y8XVBV"
          target="_blank"
          rel="noopener"
          className="underline hover:no-underline hover:text-indigo-500"
        >
          <ChartSquareBarIcon className="inline-block w-5 h-5 mr-1" />
          We use Fathom
        </a>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">
            Other projects
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-0.5 lg:mt-12">
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
    </Provider>
  );
}
