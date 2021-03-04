import { Client } from "pg";
import { graphql } from "@octokit/graphql";
import orderBy from "lodash/orderBy";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import GitHubIcon from "../svg/github.svg";
import ChevronRightIcon from "../svg/chevron-right.svg";
import TwitterLogo from "../svg/twitter.svg";
import cx from "classnames";
import Header from "../components/Header.js";
import Reactions from "../components/Reactions.js";
import Profile from "../components/Profile.js";
import { reactionsMetadata } from "../lib/reactions.js";
import formatNumber from "../lib/formatNumber.js";
import Head from "next/head";

const reactionsReleaseDate = "2016-03-10T00:00:00Z";

const positiveReactions = [
  reactionsMetadata.THUMBS_UP,
  reactionsMetadata.HOORAY,
  reactionsMetadata.HEART,
  reactionsMetadata.ROCKET,
];
const negativeReactions = [
  reactionsMetadata.THUMBS_DOWN,
  reactionsMetadata.CONFUSED,
];
const funnyReactions = [reactionsMetadata.LAUGH];

export default function UserPage({
  reactions = {
    THUMBS_UP: 100,
    THUMBS_DOWN: 100,
    LAUGH: 100,
    HOORAY: 100,
    CONFUSED: 100,
    HEART: 100,
    ROCKET: 100,
    EYES: 100,
  },
  totalReactions = 1000,
  totalComments = 2000,
  commentsWithReactions = 900,
  mostPopularComments,
  leastPopularComments,
  funniestComments,
  hadError = false,
}) {
  const router = useRouter();
  const { login = "octocat" } = router.query;
  const loading = router.isFallback === true;
  const [session] = useSession();
  const isCurrentUser = session?.user.name === login;

  return (
    <div className={cx("pt-10", loading && "overflow-y-scroll")}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="max-w-screen-lg mx-auto px-2.5 relative">
        <Header />
        {loading && (
          <div className="text-gray-700 text-lg text-center mb-20 p-5 sm:p-10 rounded-2xl border sm:mx-10 shadow-md">
            {/* <div className="absolute inset-0 loading z-0 opacity-50 rounded-full"></div> */}
            <p className="relative z-10">
              ⏳ Page generation can take up to 30 seconds. <br />
              <br />
              While you&apos;re here you can follow me on Twitter{" "}
              <a
                href="https://twitter.com/vvoyer"
                target="_blank"
                rel="noopener"
                className="underline hover:no-underline hover:text-indigo-500"
              >
                @vvoyer
              </a>
              , subscribe to{" "}
              <a
                href="https://nextjsnews.com"
                target="_blank"
                rel="noopener"
                className="underline hover:no-underline hover:text-indigo-500"
              >
                Next.js News
              </a>
              , or check out my SaaS:{" "}
              <a
                href="https://turnshift.app"
                target="_blank"
                rel="noopener"
                className="underline hover:no-underline hover:text-indigo-500"
              >
                TurnShift
              </a>
              .
            </p>
          </div>
        )}
        <div
          className={cx(
            "flex flex-col items-center sm:items-stretch sm:flex-row space-y-10 sm:space-y-0 sm:justify-center max-w-6xl mx-auto",
            loading && "pointer-events-none"
          )}
        >
          <Profile
            totalComments={totalComments}
            commentsWithReactions={commentsWithReactions}
            loading={loading}
            login={login}
            hadError={hadError}
          />
          <Reactions
            reactions={reactions}
            totalReactions={totalReactions}
            loading={loading}
          />
        </div>
        {hadError && (
          <p className="mt-10 -mb-10 text-sm text-center text-gray-500">
            ⚠️ Our crawler stopped early because of a{" "}
            <a
              href="https://github.com/vvo/sourcekarama/issues/1"
              target="_blank"
              rel="noopener"
              className="underline hover:no-underline hover:text-indigo-500"
            >
              GitHub bug
            </a>
          </p>
        )}
        {isCurrentUser && !loading && (
          <div className="text-center relative top-12 sm:top-20 h-0">
            <Tweet totalComments={totalComments} reactions={reactions} />
          </div>
        )}
      </div>
      {!loading && (
        <div className="bg-teal-50 py-16 sm:py-20 mt-20 sm:mt-28 space-y-10">
          <CommentsSections
            mostPopularComments={mostPopularComments}
            leastPopularComments={leastPopularComments}
            funniestComments={funniestComments}
          />
          <div className="text-center relative top-8 sm:top-12 h-0">
            {isCurrentUser ? (
              <Tweet totalComments={totalComments} reactions={reactions} />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CommentsSections({
  mostPopularComments,
  leastPopularComments,
  funniestComments,
}) {
  const router = useRouter();
  const loading = router.isFallback === true;

  if (loading) {
    return null;
  }

  return (
    <>
      <CommentSection
        comments={mostPopularComments}
        title="Most popular comments"
        reactions={positiveReactions}
      />

      <div className="relative h-1 mx-auto">
        <div
          className="absolute px-5 inset-0 flex items-center"
          aria-hidden="true"
        >
          <div className="w-full max-w-screen-xl mx-auto border-t border-gray-200"></div>
        </div>
      </div>

      <CommentSection
        comments={leastPopularComments}
        title="Less popular comments"
        reactions={negativeReactions}
      />

      <div className="relative h-1 mx-auto">
        <div
          className="absolute px-5 inset-0 flex items-center"
          aria-hidden="true"
        >
          <div className="w-full max-w-screen-xl mx-auto border-t border-gray-200"></div>
        </div>
      </div>

      <CommentSection
        comments={funniestComments}
        title="Funniest comments"
        reactions={funnyReactions}
      />
    </>
  );
}

function Tweet({ totalComments, reactions }) {
  const router = useRouter();
  const { login } = router.query;
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `I received ${formatNumber(
          reactions.THUMBS_UP
        )} 👍 on the ${formatNumber(totalComments)}`
      )} comments I posted on @GitHub. Nice!%0a%0aCheck-out more stats and create your own karma page at ${
        process.env.NEXT_PUBLIC_BASE_URL
      }/${login}.`}
      target="_blank"
      rel="noopener"
    >
      <button
        type="button"
        className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm sm:text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <TwitterLogo className="h-5 w-5 mr-2" /> Tweet my karma
      </button>
    </a>
  );
}

function CommentSection({ comments, title, reactions }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md max-w-screen-lg mx-auto">
      <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex justify-between">
          <div>{title}</div>
          <div className="opacity-50 space-x-3" aria-hidden="true">
            {reactions.map((reaction) => {
              return <span key={reaction.gitHubIndex}>{reaction.emoji}</span>;
            })}
          </div>
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <CommentItem comment={comment} reactions={reactions} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CommentItem({ comment, reactions }) {
  return (
    <a
      href={`https://github.com${comment.resourcePath}`}
      target="_blank"
      rel="noopener"
      className="block hover:bg-gray-50 group"
    >
      <div className="px-4 py-4 flex items-center sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex text-sm font-medium text-teal-600 truncate">
            <GitHubIcon
              aria-hidden="true"
              className="h-5 w-5 mr-3 text-gray-300 group-hover:text-gray-500 flex-shrink-0"
            />
            <p className="group-hover:text-indigo-600 truncate text-gray-700">
              {comment.issue.title}
            </p>
            <p className="ml-1 font-normal text-gray-500 group-hover:text-gray-800 truncate">
              {comment.repository.nameWithOwner}#{comment.issue.number}
            </p>
          </div>
          <div className="mt-4 flex-shrink-0 sm:mt-0 space-x-3 sm:filter-grayscale sm:opacity-90 transition-all group-hover:filter-none duration-300 text-gray-500 group-hover:text-gray-900">
            {reactions.map((reaction) => {
              return (
                <span key={reaction.gitHubIndex}>
                  {reaction.emoji}{" "}
                  <span className="ml-1">
                    {
                      comment.reactionGroups[reaction.gitHubIndex].users
                        .totalCount
                    }
                  </span>
                </span>
              );
            })}
          </div>
        </div>
        <div className="ml-5 flex-shrink-0">
          <ChevronRightIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </a>
  );
}

export async function getStaticProps(context) {
  const login = context.params.login;

  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  const res = await client.query({
    name: "get access_token",
    text:
      "SELECT access_token FROM accounts WHERE user_id = (SELECT id FROM users WHERE name = $1)",
    values: [login],
  });

  await client.end();

  if (res.rowCount === 0) {
    return {
      notFound: true,
    };
  }

  // const { results: comments, hadError } = await fetchGitHubData(
  //   login,
  //   res.rows[0].access_token
  // );

  // require("fs").writeFileSync(
  //   "data.json",
  //   JSON.stringify({ comments, hadError }, null, 2)
  // );
  const { comments, hadError } = JSON.parse(
    require("fs").readFileSync("data.json")
  );
  const reactions = {
    THUMBS_UP: 0,
    THUMBS_DOWN: 0,
    LAUGH: 0,
    HOORAY: 0,
    CONFUSED: 0,
    HEART: 0,
    ROCKET: 0,
    EYES: 0,
  };

  const totalComments = comments.length;
  let commentsWithReactions = 0;
  let totalReactions = 0;

  for (const comment of comments) {
    reactions.THUMBS_UP += comment.reactionGroups[0].users.totalCount;
    reactions.THUMBS_DOWN += comment.reactionGroups[1].users.totalCount;
    reactions.LAUGH += comment.reactionGroups[2].users.totalCount;
    reactions.HOORAY += comment.reactionGroups[3].users.totalCount;
    reactions.CONFUSED += comment.reactionGroups[4].users.totalCount;
    reactions.HEART += comment.reactionGroups[5].users.totalCount;
    reactions.ROCKET += comment.reactionGroups[6].users.totalCount;
    reactions.EYES += comment.reactionGroups[7].users.totalCount;

    totalReactions += comment.reactionGroups.reduce((acc, reactionGroup) => {
      return acc + reactionGroup.users.totalCount;
    }, 0);

    // precompute some values for sorting
    comment.positiveReactions = positiveReactions.reduce((acc, reaction) => {
      return (
        acc + comment.reactionGroups[reaction.gitHubIndex].users.totalCount
      );
    }, 0);
    comment.negativeReactions = negativeReactions.reduce((acc, reaction) => {
      return (
        acc + comment.reactionGroups[reaction.gitHubIndex].users.totalCount
      );
    }, 0);
    comment.funnyReactions = funnyReactions.reduce((acc, reaction) => {
      return (
        acc + comment.reactionGroups[reaction.gitHubIndex].users.totalCount
      );
    }, 0);

    const hasReactions = comment.reactionGroups.some((reactionGroup) => {
      return reactionGroup.users.totalCount > 0;
    });

    if (hasReactions) {
      commentsWithReactions++;
    }
  }

  const mostPopularComments = orderBy(comments, "positiveReactions", "desc")
    .filter((comment) => comment.positiveReactions > 0)
    .slice(0, 5);

  const leastPopularComments = orderBy(comments, "negativeReactions", "desc")
    .filter((comment) => comment.negativeReactions > 0)
    .slice(0, 5);

  const funniestComments = orderBy(comments, "funnyReactions", "desc")
    .filter((comment) => comment.funnyReactions > 0)
    .slice(0, 5);

  // require("fs").writeFileSync(
  //   "demo.json",
  //   JSON.stringify(
  //     {
  //       reactions,
  //       totalReactions,
  //       totalComments,
  //       commentsWithReactions,
  //     },
  //     null,
  //     2
  //   )
  // );

  return {
    revalidate: 60 * 60,
    props: {
      reactions,
      totalReactions,
      totalComments,
      commentsWithReactions,
      mostPopularComments,
      leastPopularComments,
      funniestComments,
      hadError,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { login: "vvo" } }],
    fallback: true,
  };
}

async function fetchGitHubData(
  login,
  accessToken,
  results = [],
  paginatedNodes = 0,
  cursor
) {
  console.log("fetching", results.length);

  const query = `
query listReactions($login: String!, $cursor: String) {
  user(login: $login) {
    issueComments(last: 100, before:$cursor) {
      totalCount
      pageInfo {
        startCursor
        hasPreviousPage
      }
      nodes {
        id
        resourcePath
        repository {
          nameWithOwner
        }
        issue {
          title
          number
        }
        createdAt
        reactionGroups {
          content,
          users {
            totalCount
          }
        }
      }
    }
  },
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}
`;

  const {
    user: {
      issueComments: {
        nodes: comments,
        pageInfo: { hasPreviousPage, startCursor },
      },
    },
  } = await graphql(query, {
    login,
    cursor,
    headers: {
      authorization: `bearer ${accessToken}`,
    },
  });

  const onlyPostReactionsComments = comments.filter(
    (comment) => comment.createdAt > reactionsReleaseDate
  );

  results.push(...onlyPostReactionsComments);

  if (
    hasPreviousPage &&
    comments.length === onlyPostReactionsComments.length && // this means we did not filter out any comment
    paginatedNodes + comments.length <
      process.env.NEXT_PUBLIC_MAX_COMMENTS_NODES
  ) {
    try {
      return await fetchGitHubData(
        login,
        accessToken,
        results,
        paginatedNodes + comments.length,
        startCursor
      );
    } catch (error) {
      console.error("Could not finish getting data for", login);
      return { results, hadError: true };
    }
  }

  return { results, hadError: false };
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
