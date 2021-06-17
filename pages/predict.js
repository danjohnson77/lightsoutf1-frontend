import { useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import DraggableTable from "../components/DraggableTable";

const predict = ({ drivers, race }) => {
  const [list, setList] = useState(drivers);
  const [initialList, setInitialList] = useState(drivers);

  const [session, loading] = useSession();
  console.log(drivers, race);

  const handleSave = async () => {
    if (!session) {
      return "Please log in";
    }
    const saved = await axios.post(`http://localhost:3000/api/predict`, {
      user: session.user,
      raceId: race.id,
      list: list.map((l) => l.id),
    });

    console.log("saved", saved.data);
  };

  const handleReset = () => {
    setList(initialList);
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
