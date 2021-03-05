import Header from "../components/Header";
import PageLayout from "../components/layouts/PageLayout";
import NotFoundIllustration from "../svg/not-found.svg";
export default function Custom404() {
  return (
    <div className={"pt-10"}>
      <div className="max-w-screen-lg mx-auto px-2.5 relative">
        <Header />
        <h1 className="text-gray-900 text-4xl font-extrabold text-center">
          Woops!
        </h1>
        <p className="text-gray-700 text-center text-lg mt-12 sm:mt-20 sm:w-1/2 mx-auto">
          We could not find this page, if you believe this is an error then open
          a GitHub issue:{" "}
          <a
            href="https://github.com/vvo/sourcekarma"
            target="_blank"
            rel="noopener"
            className="underline hover:no-underline hover:text-indigo-600"
          >
            https://github.com/vvo/sourcekarma
          </a>
          .
        </p>
        <div className="px-14 sm:px-0">
          <NotFoundIllustration className="sm:w-1/2 mx-auto mt-12 sm:mt-20" />
        </div>
      </div>
    </div>
  );
}

Custom404.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};
