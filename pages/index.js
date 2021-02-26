import Head from "next/head";
import useSWR from "swr";
import { request } from "graphql-request";

const fetcher = (query) => request("https://api.github.com/graphql", query);

export default function Home() {
  const { data: issues } = useSWR(
    `{
  user(login: "vvo") {
    commitComments(last: 10) {
      nodes {
        resourcePath
        reactionGroups {
          content,
          users {
            totalCount
          }
        }
      }
    }
    issueComments(last: 10) {
      nodes {
        resourcePath
        reactionGroups {
          content,
          users {
            totalCount
          }
        }
      }
    }
  }
}
`,
    fetcher
  );

  console.log(issues);

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
      Hello!
    </>
  );
}
