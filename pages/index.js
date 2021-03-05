import { signIn, signOut, useSession } from "next-auth/client";
import HeroIllustration from "../svg/hero.svg";
import GitHubIcon from "../svg/github.svg";
import Link from "next/link";
import Reactions from "../components/Reactions";
import Profile from "../components/Profile";
import PageLayout from "../components/layouts/PageLayout";

// meta tags index page (+title)
// social image index page (arrow like)

// show twitter feed on homepage (manually selected tweets)
// ability to get markdown of a github badge: need to create a different badge (no picture) and another api route, doable
// dark mode
// ability to delete account

// publish to PH, Show HN, made with next, made with tailwind, twitter rauchg

// Update readme + logo / hero on github repository
// check accessibility measure.dev
// vercel memory size
// install only prod deps

export default function Home() {
  const [session] = useSession();

  return (
    <div className="max-w-screen-2xl mx-auto py-10 px-2.5 lg:px-10">
      <div className="flex sm:flex-row sm:items-center flex-col-reverse">
        <div className="sm:w-1/2">
          <Link href="/">
            <a>
              <h1 className="text-center sm:text-left mt-12 sm:mt-0 text-5xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-gray-900">
                Source <span className="text-teal-700">Karma</span>
              </h1>
            </a>
          </Link>

          <p className="text-gray-700 text-lg text-center sm:text-left sm:text-xl mt-12 sm:mt-8 sm:w-4/5">
            Discover how people react to you on GitHub. Create and share your
            open-source karma score card.
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
        Here's a preview of what you&apos;ll get 👇
      </h2>
      <div className="relative mt-16 sm:mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
        <div className="flex flex-col items-center sm:items-stretch sm:flex-row space-y-10 sm:space-y-0 sm:justify-center pointer-events-none max-w-6xl mx-auto">
          <Profile
            totalComments={5000}
            commentsWithReactions={1228}
            loading={false}
            login="bluebill1049"
          />
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
      {!session && (
        <div className="text-center mt-24">
          <LoginButton />
        </div>
      )}
      <div className="bg-white mt-10">
        <div className="max-w-7xl mx-auto pt-16 px-4 sm:pt-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center sm:text-4xl">
            Questions?
          </h2>
          <div className="mt-12">
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
                  What's the tech stack?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Next.js, React, Tailwind CSS, Tailwind UI,{" "}
                  <a
                    href="https://craftwork.design"
                    target="_blank"
                    rel="noopener"
                    className="underline hover:no-underline hover:text-indigo-500"
                  >
                    craftwork.design
                  </a>
                  , PostgreSQL, AWS, Vercel, Pupeeter (for the opengraph
                  images!),{" "}
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
                <dd className="mt-2 text-base text-gray-500">~Every day</dd>
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

function LoginButton() {
  return (
    <button
      type="button"
      className="inline-flex items-center px-5 py-2.5 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      onClick={() =>
        signIn("github", {
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect`,
        })
      }
    >
      <GitHubIcon className="-ml-1 mr-3 h-7 w-7" aria-hidden="true" />
      Get your karma
    </button>
  );
}

function LoginButtons() {
  return (
    <>
      <LoginButton />
      <Link href="/vvo">
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
          See your page
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
