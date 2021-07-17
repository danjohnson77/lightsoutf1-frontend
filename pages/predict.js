import { useState } from "react";
import { useSession, getSession } from "next-auth/client";
import axios from "axios";
import DraggableTable from "../components/DraggableTable";
import Tiebreaker from "../components/Tiebreaker";

const predict = ({ drivers, race, tiebreaker, lastUpdated }) => {
  console.log("race", race);

  const { id, raceName, displayDate } = race;

  const [session, loading] = useSession();

  const [initialList, setInitialList] = useState(drivers);

  const [list, setList] = useState(drivers);

  const [tiebreakerState, setTiebreakerState] = useState(
    tiebreaker === {}
      ? {
          hours: "",
          minutes: "",
          seconds: "",
          fractions: "",
        }
      : tiebreaker
  );

  const handleSave = async () => {
    if (!session) {
      return "Please log in";
    }

    const saved = await axios.post(`http://localhost:3000/api/predict`, {
      user: session.user,
      raceId: id,
      raceName,
      list: list.map((l) => {
        const { id, name, team, teamId } = l;
        return { id, name, team, teamId };
      }),
      tiebreaker: tiebreakerState,
    });

    await getSession();

    console.log("saved", saved.data);
  };

  const handleReset = () => {
    setList(initialList);
  };

  return (
    <div className="flex flex-col bg-offBlack items-center text-center px-5">
      <div className="flex flex-col">
        <h2 className="pt-5 ">PREDICT THE {raceName.toUpperCase()}</h2>
        <p className="hidden lg:block">-</p>
        <h3>{displayDate}</h3>
      </div>

      <div className="flex justify-evenly w-full pt-5">
        <p>User: {session ? session.user.name : "Not Logged In"}</p>
        <p>Points: 302</p>
        <p>Rank: 2031</p>
      </div>

      {session ? (
        <div className="flex flex-col">
          <div className="flex py-5">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleReset} className="bg-red-700">
              Reset
            </button>
          </div>
          <div className="flex flex-col w-full">
            <p>Last Updated:</p>
            <p>{lastUpdated}</p>
          </div>
        </div>
      ) : (
        <p>Log in!</p>
      )}

      <div className="w-full">
        <DraggableTable list={list} setList={setList} />
      </div>
      <div className="flex items-start flex-col bg-black lg:w-6/12 p-3 my-10">
        <Tiebreaker
          tiebreaker={tiebreakerState}
          setTiebreaker={setTiebreakerState}
        />
      </div>
    </div>
  );
};

export default predict;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let drivers = [];
  let tiebreaker = {};
  let lastUpdated = "";

  const raceReq = await axios.get("http://localhost:3000/api/getRace");

  const race = raceReq.data || {
    id: "1900r1",
    raceName: "Race Not Found",
    displayDate: "Error",
    date: Date.now(),
  };

  if (session) {
    const {
      user: { currentPrediction },
    } = session;

    if (currentPrediction.list) {
      drivers = currentPrediction.list;
      tiebreaker = currentPrediction.tiebreaker;
      lastUpdated = currentPrediction.lastUpdated;
    } else {
      const driversReq = await axios.get(
        "http://localhost:3000/api/getDrivers"
      );

      drivers = driversReq.data;
    }
  } else {
    const driversReq = await axios.get("http://localhost:3000/api/getDrivers");

    drivers = driversReq.data;
  }
  return {
    props: { drivers, race, tiebreaker, lastUpdated },
  };
}
