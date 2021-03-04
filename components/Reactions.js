import CountUp from "react-countup";
import { reactionsMetadata } from "../lib/reactions.js";
import cx from "classnames";
import styles from "./Reactions.module.css";
import formatNumber from "../lib/formatNumber.js";
import { useEffect, useRef } from "react";

export default function Reactions({ reactions, totalReactions, loading }) {
  return (
    <div className="sm:w-1/2 flex justify-center">
      <ul className="grid grid-cols-2 gap-y-6 gap-x-14 sm:gap-x-20">
        {Object.entries(reactions).map(([reactionName, reactionCount]) => {
          return (
            <li className="flex items-center justify-start" key={reactionName}>
              <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center bg-teal-50 border border-teal-400 rounded-full text-xl sm:text-3xl">
                {reactionsMetadata[reactionName].emoji}
              </div>
              <div
                className={cx(
                  "space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-lg sm:text-xl font-medium leading-tight text-gray-700",
                  styles.number
                )}
              >
                <div className={cx(loading && "loading")}>
                  <Number value={reactionCount} loading={loading} />
                </div>
                <div className={cx(loading && "loading")}>
                  <Number
                    value={(reactionCount / totalReactions) * 100}
                    loading={loading}
                  />
                  %
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Number({ value, loading }) {
  if (loading) {
    return formatNumber(value);
  }

  return (
    <>
      <CountUp formattingFn={formatNumber} end={value} />
      <ServerNumber value={formatNumber(value)} />
    </>
  );
}

function ServerNumber({ value }) {
  useEffect(() => {
    ref.current.classList.add("hidden");
    ref.current.setAttribute("aria-hidden", "true");
  }, []);

  const ref = useRef(null);

  return <span ref={ref}>{value}</span>;
}
