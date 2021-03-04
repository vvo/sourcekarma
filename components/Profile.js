import formatNumber from "../lib/formatNumber";
import cx from "classnames";

export default function Profile({
  totalComments,
  commentsWithReactions,
  login,
  loading,
  hadError = false,
}) {
  return (
    <div className="flex flex-col items-center sm:justify-between sm:w-1/2">
      <img
        src={`https://github.com/${login}.png`}
        className="h-40 w-40 rounded-full"
      />
      <a
        href={`https://github.com/${login}`}
        className="text-teal-600 hover:text-indigo-600 underline hover:no-underline mt-6 sm:mt-0"
      >
        <h1 className="text-2xl sm:text-4xl font-medium sm:font-semibold tracking-tight">
          @{login}
        </h1>
      </a>
      <p className="text-md sm:text-lg text-gray-700 text-center mt-6 sm:mt-0">
        Showing last{" "}
        <b className={cx(loading && "loading")}>
          {formatNumber(totalComments)}
        </b>{" "}
        comments.
        <br />
        <b className={cx(loading && "loading")}>
          {formatNumber((commentsWithReactions / totalComments) * 100)}%
        </b>{" "}
        of comments generated a reaction.
      </p>
    </div>
  );
}
