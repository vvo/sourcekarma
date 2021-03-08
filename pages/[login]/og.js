import { useRouter } from "next/router";
import Head from "next/head";
import Logo from "../../svg/logo.svg";
import { reactionsMetadata } from "../../lib/reactions.js";
import formatNumber from "../../lib/formatNumber";
import { useEffect, useState } from "react";
import twemoji from "twemoji";

export default function ogBadgePage() {
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
    if (login === undefined) {
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
          width: "1200px",
          height: "630px",
        }}
        className="border-14 flex border-teal-600 bg-teal-600 relative"
        data-qa={found === true ? "loaded" : "loading"}
        id="badge"
      >
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <div className="bg-white rounded-lg p-8 flex-grow">
          <div className="flex items-center mb-6">
            <Logo className="w-14 h-14" />
            <div className="text-4xl font-extrabold tracking-tight text-gray-900 pt-4 ml-2">
              Source <span className="text-teal-700">Karma</span>
            </div>
          </div>

          <div className="space-y-10 flex flex-row justify-center max-w-5xl">
            <div className="flex flex-col justify-center w-1/2 space-y-8">
              <h1 className="text-4xl text-center font-semibold tracking-tight text-gray-900">
                @{login}
              </h1>
              <div className="text-center">
                <img
                  src={`https://github.com/${login}.png`}
                  className="h-72 w-72 rounded-full mx-auto"
                  alt={`GitHub avatar for ${login}`}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <ul className="grid grid-cols-2 gap-y-6 gap-x-20">
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
                          className="w-20 h-20 p-4 flex items-center justify-center bg-teal-50 border border-teal-400 rounded-full text-4xl"
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
                        <div className="space-y-2 ml-4 text-2xl font-semibold leading-tight text-gray-700 number">
                          <div>{formatNumber(reactionCount)}</div>
                          <div>
                            {formatNumber(
                              (reactionCount / totalReactions) * 100
                            )}
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
    </div>
  );
}

ogBadgePage.getLayout = function getLayout(page) {
  return <>{page}</>;
};
