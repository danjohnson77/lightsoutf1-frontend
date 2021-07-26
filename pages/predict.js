import { useState } from "react";
import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import DraggableTable from "../components/DraggableTable";
import Tiebreaker from "../components/Tiebreaker";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

const predict = ({ drivers, race, tiebreaker, lastUpdated }) => {
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

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const router = useRouter();

  const handleSave = async () => {
    if (!session) {
      return "Please log in";
    }

    const saved = await axios.post(`/api/predict`, {
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

    router.push("/predict");
  };

  const handleReset = () => {
    setList(initialList);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col bg-offBlack items-center text-center px-5">
          <Modal
            message="Save New Predictions?"
            subMessage="This will overwrite your previous entry"
            confirmText="Save"
            cancelText="Don't Save"
            openState={saveModalOpen}
            setOpenState={setSaveModalOpen}
            confirmFunction={handleSave}
          />
          <Modal
            message="Reset the List?"
            subMessage="This will reset the list to the last saved version"
            confirmText="Reset"
            cancelText="Cancel"
            openState={resetModalOpen}
            setOpenState={setResetModalOpen}
            confirmFunction={handleReset}
          />
          {session ? (
            <>
              <div className="flex flex-col">
                <h2 className="pt-5 ">PREDICT THE {raceName.toUpperCase()}</h2>
                <p className="hidden lg:block">-</p>
                <h3>{displayDate}</h3>
              </div>
              <div className="flex justify-evenly w-full pt-5">
                <p>User: {session ? session.user.name : "Not Logged In"}</p>
                <p>Points: {session.user.points}</p>
                <p>Rank: XXX</p>
              </div>
              <div className="flex flex-col">
                <div className="flex py-5">
                  <button
                    onClick={() => {
                      setSaveModalOpen(true);
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setResetModalOpen(true);
                    }}
                    className="bg-red-700"
                  >
                    Reset
                  </button>
                </div>
                <div className="flex flex-col w-full">
                  <p>Last Updated:</p>
                  <p>{lastUpdated || "No predictions saved yet"}</p>
                </div>
              </div>
              <div className="w-full">
                <DraggableTable list={list} setList={setList} />
              </div>
              <div className="flex items-start flex-col bg-black lg:w-6/12 p-3 my-10">
                <Tiebreaker
                  tiebreaker={tiebreakerState}
                  setTiebreaker={setTiebreakerState}
                />
              </div>{" "}
            </>
          ) : (
            <div className="min-h-screen flex flex-col justify-center">
              <h1>Sign up or Log in to Predict the Next Race!</h1>
              <div className="flex mx-5 p-5">
                <Link href="/signup">
                  <button className="btn">SIGN UP</button>
                </Link>
                <Link href="/login">
                  <button className="btn">LOG IN</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default predict;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let drivers = [];
  let tiebreaker = {};
  let lastUpdated = "";

  const raceReq = await axios.get(`${process.env.BASE_URL}/api/getRace`);

  const race = raceReq.data || {
    id: "1900r1",
    raceName: "Race Not Found",
    displayDate: "Error",
    date: Date.now(),
  };

  if (session) {
    const { currentPrediction } = session.user;

    if (currentPrediction.list) {
      drivers = currentPrediction.list;
      tiebreaker = currentPrediction.tiebreaker;
      lastUpdated = currentPrediction.lastUpdated;
    } else {
      const driversReq = await axios.get(
        `${process.env.BASE_URL}/api/getDrivers
    `
      );

      drivers = driversReq.data;
    }
  } else {
    const driversReq = await axios.get(
      `${process.env.BASE_URL}/api/getDrivers`
    );

    drivers = driversReq.data;
  }
  return {
    props: { drivers, race, tiebreaker, lastUpdated },
  };
}
