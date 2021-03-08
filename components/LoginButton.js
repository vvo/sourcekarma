import { signIn } from "next-auth/client";
import { useState } from "react";
import GitHubIcon from "../svg/github.svg";
import Spinner from "../components/Spinner";
import cx from "classnames";

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      type="button"
      className={cx(
        "inline-flex items-center px-5 py-2.5 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 relative",
        isLoading && "pointer-events-none bg-opacity-20"
      )}
      onClick={() => {
        setIsLoading(true);
        signIn("github", {
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/redirect`,
        });
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="h-8 w-8 text-gray-700">
            <Spinner />
          </div>
        </div>
      )}
      <span
        className={cx("inline-flex items-center", isLoading && "opacity-10")}
      >
        <GitHubIcon className="-ml-1 mr-3 h-7 w-7" aria-hidden="true" />
        Get your karma
      </span>
    </button>
  );
}
