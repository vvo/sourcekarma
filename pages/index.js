import { signOut, useSession } from "next-auth/client";
import HeroIllustration from "../svg/hero.svg";
import Link from "next/link";
import Reactions from "../components/Reactions";
import Profile from "../components/Profile";
import PageLayout from "../components/layouts/PageLayout";
import Head from "next/head";
import LoginButton from "../components/LoginButton";
import Image from "next/image";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Spinner from "../components/Spinner";
import { useState } from "react";
import cx from "classnames";

// TODO:
// nudge GitHub
// publish to PH
// publish to newsletters, which ones?
// ability to delete account
// dark mode

const title = `Discover how people react to you on GitHub - Source Karma`;
const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
const description =
  "Discover how people react to you on GitHub. Create and share your Source Karma score card.";
const socialImage = `${process.env.NEXT_PUBLIC_BASE_URL}/social.png`;

export default function Home() {
  const [session] = useSession();

  return (
    <div className="max-w-screen-2xl mx-auto py-10 px-2.5 lg:px-10">
      <Head>
        <title>{title}</title>
        <link href={url} rel="canonical" />
        <meta content={title} name="title" />
        <meta content={description} name="description" />
        <meta content="website" property="og:type" />
        <meta content={title} property="og:title" />
        <meta content={description} property="og:description" />
        <meta content={socialImage} property="og:image" />
        <meta content={url} property="og:url" />
        <meta content="summary_large_image" property="twitter:card" />
      </Head>
      <div className="flex sm:flex-row sm:items-center flex-col-reverse">
        <div className="sm:w-1/2">
          <Link href="/">
            <a>
              <h1 className="text-center sm:text-left mt-12 sm:mt-0 text-5xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-gray-900">
                Source <span className="text-teal-700">Karma</span>
              </h1>
            </a>
          </Link>

          <p className="text-gray-700 text-lg text-center sm:text-left sm:text-xl lg:text-2xl xl:text-3xl mt-12 sm:mt-8 sm:w-4/5 lg:w-11/12">
            Discover how people react to you on GitHub.
          </p>

          <div className="mt-12 flex justify-center sm:justify-start">
            {!session && <LoginButtons />}
            {session && <LoggedInButtons />}
          </div>
          <p className="text-center sm:text-left text-gray-500 mt-5 sm:mt-3 italic text-sm">
            Source Karma asks for <u>public data only</u>. <br />
            We use GitHub login so we don't get rate limited.
          </p>
        </div>

        <div className="px-10 sm:pr-0 flex-grow">
          <HeroIllustration className="w-full" />
        </div>
      </div>

      <h2 className="mt-12 sm:mt-24 text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Create and share your Source Karma
      </h2>
      <div className="mt-16 sm:mt-28 flex flex-col items-center sm:items-stretch sm:flex-row space-y-10 sm:space-y-0 sm:justify-center pointer-events-none max-w-6xl mx-auto">
        <Profile
          totalComments={5000}
          commentsWithReactions={1228}
          loading={false}
          login="bluebill1049"
        />
        <div className="sm:w-1/2 flex justify-center">
          <Reactions
            reactions={{
              THUMBS_UP: 905,
              THUMBS_DOWN: 20,
              LAUGH: 84,
              HOORAY: 186,
              CONFUSED: 21,
              HEART: 478,
              ROCKET: 146,
              EYES: 53,
            }}
            totalReactions={1893}
            loading={false}
          />
        </div>
      </div>
      <h2 className="mt-12 sm:mt-32 text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        They ❤️ Source Karma
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-x-4 auto-cols-min xl:grid-cols-5 mt-12 sm:mt-16"
        style={{ minHeight: "230px" }}
      >
        <div>
          <Tweet tweetId="1368957988900380673" />
        </div>
        <div>
          <Tweet tweetId="1369136339908784129" />
        </div>
        <div className="hidden md:block">
          <Tweet tweetId="1368996709120962561" />
        </div>
        <div className="hidden xl:block">
          <Tweet tweetId="1368955214695436294" />
        </div>
        <div className="hidden xl:block">
          <Tweet tweetId="1368992902731431939" />
        </div>
      </div>
      {!session && (
        <div className="text-center mt-24">
          <LoginButton />
        </div>
      )}
      <h2 className="mt-12 sm:mt-32 text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Add a GitHub badge to your readme
      </h2>
      <div className="mt-12">
        <Image
          src="/screenshot.png"
          width={1443}
          height={969}
          alt="Screenshot of an example Source Karma GitHub badge"
        />
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto pt-16 px-4 sm:pt-32 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
            Questions?
          </h2>
          <div className="mt-12 sm:mt-28">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Why did you make this?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Hey hi, 👋&nbsp;&nbsp;
                  <a
                    href="https://twitter.com/vvoyer"
                    target="_blank"
                    rel="noopener"
                    className="underline hover:no-underline hover:text-indigo-500"
                  >
                    Vincent
                  </a>{" "}
                  here. I like to post solutions and workarounds in GitHub
                  comments for others to use. Building this site is a way for me
                  to boost my morale by seeing which of my comments helped the
                  most. I hope you'll like it too :)
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Why do you need my GitHub login?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  GitHub provides a generous 5,000 request per hour rate-limit
                  on their API. A Source Karma page can use up to 50 requests.
                  To circumvent this, we use a public-data-only GitHub login
                  which allow us to never worry about rate limits.
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What information do you store on me?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  We store your GitHub username (public), GitHub user id
                  (public) and GitHub access token. That's it. No email, no
                  weird data. Our code is{" "}
                  <a
                    href="https://github.com/vvo/sourcekarma"
                    target="_blank"
                    rel="noopener"
                    className="underline hover:no-underline hover:text-indigo-500"
                  >
                    open-source
                  </a>
                  .
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What's the product / tech stack?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  This website would have been a lot harder to do without:
                  Next.js, React, Tailwind CSS,{" "}
                  <a
                    href="https://github.com/octokit/graphql.js"
                    target="_blank"
                    rel="noopener"
                    className="underline hover:no-underline hover:text-indigo-500"
                  >
                    Octokit
                  </a>
                  , Tailwind UI,{" "}
                  <a
                    href="https://craftwork.design/downloads/category/illustrations/?ref=87&campaign=Websitelink"
                    target="_blank"
                    rel="noopener"
                    className="underline hover:no-underline hover:text-indigo-500"
                  >
                    craftwork.design
                  </a>
                  , PostgreSQL, AWS, Vercel, Puppeteer (for GitHub badges
                  generation),{" "}
                  <a
                    href="https://twemoji.twitter.com/"
                    target="_blank"
                    rel="noopener"
                    className="underline hover:no-underline hover:text-indigo-500"
                  >
                    twemoji
                  </a>
                  , and{" "}
                  <a
                    href="https://usefathom.com/ref/Y8XVBV"
                    target="_blank"
                    rel="noopener"
                    className="underline hover:no-underline hover:text-indigo-500"
                  >
                    Fathom
                  </a>
                  .
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  When is the data updated?
                </dt>
                <dd className="mt-2 text-base text-gray-500">~Every day.</dd>
              </div>

              <div className="hidden md:block">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Is there a sixth question?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  No but if I remove this div it will break the grid. And yes
                  this div hides on mobile 🤣.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <PageLayout>{page}</PageLayout>;
};

function LoginButtons() {
  return (
    <>
      <LoginButton />
      <Link href="/bluebill1049">
        <a className="inline-flex">
          <button
            type="button"
            className="ml-3 inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-teal-700 bg-white hover:bg-gray-50 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Live demo
          </button>
        </a>
      </Link>
    </>
  );
}

function Tweet({ tweetId }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && (
        <div
          className="flex items-center justify-center"
          style={{ minHeight: "230px" }}
        >
          <div className="h-20 w-20 text-teal-300">
            <Spinner />
          </div>
        </div>
      )}
      <div className={cx(isLoading && "invisible")}>
        <TwitterTweetEmbed
          tweetId={tweetId}
          onLoad={() => {
            setIsLoading(false);
          }}
          options={{
            cards: "hidden",
            conversation: "none",
          }}
        />
      </div>
    </>
  );
}

function YourPageButton({ login }) {
  return (
    <Link href={`/${login}`}>
      <a>
        <button
          type="button"
          className="inline-flex items-center px-5 py-2.5 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <img
            src={`https://github.com/${login}.png`}
            className="-ml-1 mr-3 h-7 w-7 rounded-full"
            alt={`GitHub avatar for ${login}`}
          />
          Your page
        </button>
      </a>
    </Link>
  );
}

function LoggedInButtons() {
  const [session] = useSession();

  return (
    <>
      <YourPageButton login={session.user.name} />
      <button
        type="button"
        className="ml-3 inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-teal-700 bg-white hover:bg-gray-50 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        onClick={() => signOut()}
      >
        Log out
      </button>
    </>
  );
}
