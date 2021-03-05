import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import Logo from "../svg/logo.svg";
import GitHubIcon from "../svg/github.svg";

export default function Header() {
  const [session] = useSession();

  return (
    <div className="flex items-center mb-12 sm:mb-20">
      <Link href="/">
        <a
          className="flex items-center"
          title="Source Karma: discover how people react to you on GitHub"
        >
          <Logo className="w-10 h-10 sm:w-14 sm:h-14" />
          <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 pt-2 sm:pt-4 ml-2">
            Source <span className="text-teal-700">Karma</span>
          </div>
        </a>
      </Link>
      <div className="flex-grow flex justify-end pt-2 sm:pt-4">
        {!session && <LoginButtons />}
        {session && <LoggedInButtons />}
      </div>
    </div>
  );
}

function LoginButtons() {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-3 sm:px-5 py-1 sm:py-2.5 border border-transparent shadow-sm text-sm sm:text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        onClick={() =>
          signIn("github", {
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect`,
          })
        }
      >
        <GitHubIcon className="-ml-1 mr-3 h-7 w-7" aria-hidden="true" />
        Get your karma
      </button>
    </>
  );
}

function LoggedInButtons() {
  const [session] = useSession();

  return (
    <>
      <Link href={`/${session.user.name}`}>
        <a>
          <button
            type="button"
            className="inline-flex items-center px-3 sm:px-5 py-1 sm:py-2.5 border border-transparent shadow-sm text-sm sm:text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <img
              src={`https://github.com/${session.user.name}.png`}
              className="-ml-1 mr-3 h-7 w-7 rounded-full"
              alt={`GitHub avatar for ${session.user.name}`}
            />
            Your page
          </button>
        </a>
      </Link>
      <button
        type="button"
        className="ml-3 inline-flex items-center px-3 sm:px-5 py-1 sm:py-2.5 border border-gray-300 shadow-sm text-sm sm:text-base font-medium rounded-md text-teal-700 bg-white hover:bg-gray-50 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Log out
      </button>
    </>
  );
}
