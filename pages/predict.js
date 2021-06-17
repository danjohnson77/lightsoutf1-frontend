import { useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import DraggableTable from "../components/DraggableTable";

const predict = ({ drivers, race }) => {
  const [list, setList] = useState(drivers);
  const [initialList, setInitialList] = useState(drivers);
  const [tiebreaker, setTiebreaker] = useState({});
  const [tiebreakerError, setTiebreakerError] = useState(null);

  const [session, loading] = useSession();

  const handleSave = async () => {
    if (!session) {
      return "Please log in";
    }
    const keys = Object.keys(tiebreaker);

    const saved = await axios.post(`http://localhost:3000/api/predict`, {
      user: session.user,
      raceId: race.id,
      list: list.map((l) => l.id),
      tiebreaker,
    });

    console.log("saved", saved.data);
  };

  const handleReset = () => {
    setList(initialList);
  };

  const handleTiebreakerChange = (e) => {
    const { name, value } = e.target;
    setTiebreakerError(null);
    if (name === "minutes" || name === "seconds") {
      if (value > 59) {
        setTiebreakerError(`${name} must be between 1 and 59`);
      }
    }
    setTiebreaker({ ...tiebreaker, [name]: value });
  };

  return (
    <div className="flex flex-col bg-offBlack items-center text-center px-5">
      <div className="flex flex-col">
        <h2 className="pt-5 ">PREDICT THE {race.raceName}</h2>
        <p className="hidden lg:block">-</p>
        <h3>23 MAY 2021</h3>
      </div>

      <div className="flex justify-evenly w-full pt-5">
        <p>User: {session ? session.user.name : "Not Logged In"}</p>
        <p>Points: 302</p>
        <p>Rank: 2031</p>
      </div>
      <div className="flex justify-between w-6/12 mx-auto pt-5">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleReset} className="bg-red-700">
          Reset
        </button>
      </div>
      <div className="w-full">
        <DraggableTable list={list} setList={setList} />
      </div>
      <div className="flex items-start flex-col bg-black lg:w-6/12 p-3 my-10">
        <h2>Tiebreaker: Winner Total Race Time</h2>

        <div className="flex items-center w-full">
          <input
            type="number"
            name="hours"
            id="hours"
            maxLength="2"
            placeholder="00"
            value={tiebreaker.hours}
            className="w-3/12 text-center"
            onChange={handleTiebreakerChange}
          />

          <span>:</span>
          <input
            type="number"
            name="minutes"
            id="minutes"
            maxLength="2"
            max="59"
            placeholder="00"
            value={tiebreaker.minutes}
            className="w-3/12 text-center"
            onChange={handleTiebreakerChange}
          />
          <span>:</span>
          <input
            type="number"
            name="seconds"
            id="seconds"
            maxLength="2"
            max="59"
            placeholder="00"
            value={tiebreaker.seconds}
            className="w-3/12 text-center"
            onChange={handleTiebreakerChange}
          />
          <span>.</span>
          <input
            type="number"
            name="fractions"
            id="fractions"
            maxLength="3"
            placeholder="000"
            value={tiebreaker.fractions}
            className="w-3/12 text-center"
            onChange={handleTiebreakerChange}
          />
        </div>
        <div className="w-full text-red-500">
          {tiebreakerError && tiebreakerError}
        </div>
      </div>
    </div>
  );
};

export default predict;

export async function getServerSideProps() {
  const drivers = axios.get("http://localhost:3000/api/getDrivers");
  const race = axios.get("http://localhost:3000/api/getRace");
  const allRes = await axios.all([drivers, race]);

  return {
    props: { drivers: allRes[0].data, race: allRes[1].data },
  };
}
