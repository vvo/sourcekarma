import { signIn, signOut, useSession } from "next-auth/client";
import HeroIllustration from "../svg/hero.svg";
import GitHubIcon from "../svg/github.svg";
import Link from "next/link";
import Reactions from "../components/Reactions";
import Profile from "../components/Profile";

// publish to PH, Show HN, made with next, made with tailwind, twitter rauchg
// read about CDN cache vercel + incremental static (leerob) careful not rebuilding pages at every new release

// rename to source karma
// create database on AWS
// deploy to Vercel

// meta tags index page
// social image index page (arrow like)

// meta tags login page
// social image login page (generation ?) if too complex: no

// github badge

// change twitter text to include funny comments
// dark mode
// faq contains which data is stored and used, obvious questions and possible errors, limitations, errors, since when are we counting, when is it updated, where is the code
// add noindex on profile pages
// Update readme
// create the issue abotu error graphql

// ability to delete account

export default function Home() {
  const [session] = useSession();

  return (
    <div className="max-w-screen-2xl mx-auto py-10 px-2.5 lg:px-10">
      <div className="flex sm:flex-row sm:items-center flex-col-reverse">
        <div className="sm:w-1/2">
          <h1 className="text-center sm:text-left mt-8 sm:mt-0 text-5xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-gray-900">
            Source <span className="text-teal-700">Karma</span>
          </h1>

          <p className="text-gray-700 text-lg text-center sm:text-left sm:text-xl mt-6 sm:w-4/5">
            Discover how people react to you on GitHub. Create and share your
            open-source karma score card.
          </p>

          <div className="mt-10 flex justify-center sm:justify-start">
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

      <h2 className="mt-12 sm:mt-24 text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-4xl">
        Here's a preview of what you&apos;ll get 👇
      </h2>

      <div className="relative mt-12 sm:mt-20">
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

      <div className="text-center mt-24">{!session && <LoginButton />}</div>
    </div>
  );
}

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
        <a>
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
