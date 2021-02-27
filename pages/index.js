import Head from "next/head";
import { useSWRInfinite } from "swr";
import { graphql } from "@octokit/graphql";
import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect, useState } from "react";

const login = "vvo";
const query = `
query listReactions($login: String!, $cursor: String) {
  user(login: $login) {
    issueComments(last: 100, before:$cursor) {
      pageInfo {
        startCursor
        hasPreviousPage
      }
      nodes {
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

const fetcher = (query, accessToken, login, cursor) => {
  return graphql(query, {
    login,
    cursor,
    headers: {
      authorization: `token ${accessToken}`,
    },
  });
};

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
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
      <h1>GH Karma</h1>
      <p>All the reactions you got on your GitHub comments</p>

      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
          <Data />
        </>
      )}
    </>
  );
}

function Data() {
  const [session] = useSession();

  const { data: issues, error, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (pageIndex === 0) {
        return [query, session.accessToken, login];
      }

      if (previousPageData?.user.issueComments.pageInfo.hasPreviousPage) {
        return [
          query,
          session.accessToken,
          login,
          previousPageData.user.issueComments.pageInfo.startCursor,
        ];
      }

      return null;
    },
    fetcher,
    { revalidateOnFocus: false, initialData: [] }
  );

  const lastRequest = issues[issues.length - 1];

  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      return;
    }

    console.log("load more");
      setSize(size + 1);
  }, [lastRequest?.user.issueComments.pageInfo.startCursor, pause]);

  const reactions = issues.reduce((acc, cur) => {
    for (const comment of cur.user.issueComments.nodes) {
      acc.THUMBS_UP += comment.reactionGroups[0].users.totalCount;
      acc.THUMBS_DOWN += comment.reactionGroups[1].users.totalCount;
      acc.LAUGH += comment.reactionGroups[2].users.totalCount;
      acc.HOORAY += comment.reactionGroups[3].users.totalCount;
      acc.CONFUSED += comment.reactionGroups[4].users.totalCount;
      acc.HEART += comment.reactionGroups[5].users.totalCount;
      acc.ROCKET += comment.reactionGroups[6].users.totalCount;
      acc.EYES += comment.reactionGroups[7].users.totalCount;
    }

    return acc;
  }, {
    THUMBS_UP: 0,
    THUMBS_DOWN: 0,
    LAUGH: 0,
    HOORAY: 0,
    CONFUSED: 0,
    HEART: 0,
    ROCKET: 0,
    EYES: 0
  });

  return (
    <>
      <ul>
        <li>👍 {reactions.THUMBS_UP}</li>
        <li>👎 {reactions.THUMBS_DOWN}</li>
        <li>😂 {reactions.LAUGH}</li>
        <li>🥳 {reactions.HOORAY}</li>
        <li>😕 {reactions.CONFUSED}</li>
        <li>❤️ {reactions.HEART}</li>
        <li>🚀 {reactions.ROCKET}</li>
        <li>👀 {reactions.EYES}</li>
      </ul>
      {lastRequest?.rateLimit && (
        <div>
          Rate Limit: {lastRequest.rateLimit.remaining}/
          {lastRequest.rateLimit.limit}
        </div>
      )}
      {/* <button onClick={() => {
        setPause(!pause);
      }}>pause</button> */}
    </>
  );
}
