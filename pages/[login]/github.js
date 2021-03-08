import { useRouter } from "next/router";
import Head from "next/head";
import Logo from "../../svg/logo.svg";
import { reactionsMetadata } from "../../lib/reactions.js";
import formatNumber from "../../lib/formatNumber";
import { useEffect, useState } from "react";
import twemoji from "twemoji";

export default function GitHubBadgePage() {
  const router = useRouter();
  const { login } = router.query;

  const [{ reactions, totalReactions, found }, setData] = useState({
    reactions: {
      THUMBS_UP: 100,
      THUMBS_DOWN: 100,
      LAUGH: 100,
      HOORAY: 100,
      CONFUSED: 100,
      HEART: 100,
      ROCKET: 100,
      EYES: 100,
    },
    totalReactions: 1000,
    found: false,
  });

  useEffect(async () => {
    if (!login || login === "[login]") {
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${login}`
    ).then((res) => res.json());

    if (res.found === false) {
      router.push("/404");
      return;
    }

    setData(res);
  }, [login]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        style={{
          width: "495px",
          height: "230px",
          borderColor: "#e1e4e8",
        }}
        className="border rounded-md py-6 bg-white absolute"
        data-qa={found === true ? "loaded" : "loading"}
        id="badge"
      >
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <div className="flex items-center justify-center">
          <Logo className="w-8 h-8" />
          <div className="text-2xl font-extrabold tracking-tight text-gray-900 pt-1 ml-2">
            Source <span className="text-teal-700">Karma</span>
          </div>
        </div>

        <div className="flex flex-row mt-8 justify-center">
          <div className="flex justify-center">
            <ul className="grid grid-cols-4 gap-y-6 gap-x-6">
              {Object.entries(reactions)
                .sort(([, reactionCountA], [, reactionCountB]) => {
                  if (reactionCountB > reactionCountA) {
                    return 1;
                  }

                  return -1;
                })
                .map(([reactionName, reactionCount]) => {
                  return (
                    <li
                      className="flex items-center justify-start"
                      key={reactionName}
                    >
                      <div
                        className="w-10 h-10 p-2 flex items-center justify-center border border-teal-400 rounded-full"
                        dangerouslySetInnerHTML={{
                          __html: twemoji.parse(
                            reactionsMetadata[reactionName].emoji,
                            {
                              folder: "svg",
                              ext: ".svg",
                            }
                          ),
                        }}
                      ></div>
                      <div className="space-y-1 ml-4 text-lg font-semibold leading-none text-gray-700 number">
                        <div>{formatNumber(reactionCount)}</div>
                        <div>
                          {formatNumber((reactionCount / totalReactions) * 100)}
                          %
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

GitHubBadgePage.getLayout = function getLayout(page) {
  return <>{page}</>;
};
