import { Suspense } from "react";
import OneStat from "./oneStat";
import { Await } from "react-router-dom";
import LoaderUi from "../UI/loader/loader";

const getUsersRank = (rankArray, username) => {
  const index = rankArray.findIndex((user) => user.username === username);
  return index + 1;
};

export default function Stats({ taskifyPoints, rankList, username }) {
  console.log(rankList);
  return (
    <div className="flex p-2 w-full max-[417px]:flex-col max-[417px]:gap-2 justify-center items-center">
      <Suspense fallback=<LoaderUi />>
        <Await resolve={rankList}>
          {(rankArray) => (
            <OneStat
              number={getUsersRank(rankArray, username)}
              field="Your rank"
            />
          )}
        </Await>
      </Suspense>

      <OneStat number={taskifyPoints} field="Taskify Points" />
    </div>
  );
}
