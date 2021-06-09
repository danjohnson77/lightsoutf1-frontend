import DraggableTable from "../components/DraggableTable";

const predict = () => {
  const tableData = [
    {
      id: "1",
      name: "Lewis HAMILTON",
      team: "Mercedes",
    },
    {
      id: "2",
      name: "Max VERSTAPPEN",
      team: "Red Bull",
    },
    {
      id: "3",
      name: "Charles LECLERC",
      team: "Ferrari",
    },
    {
      id: "4",
      name: "Daniel RICCARDO",
      team: "McLaren",
    },
  ];
  return (
    <div className="flex flex-col bg-offBlack items-center pt-5">
      <h2 className="pt-5">PREDICT THE MONACO GRAND PRIX - 23 MAY 2021</h2>
      <div className="flex justify-between w-full pt-5">
        <p>User: Bob775</p>
        <p>Points: 302</p>
        <p>Rank: 2031</p>
      </div>
      <div className="flex justify-between w-6/12 mx-auto pt-5">
        <button>Save</button>
        <button className="bg-red-700">Reset</button>
      </div>
      <div className="w-full">
        <DraggableTable data={tableData} />
      </div>
    </div>
  );
};

export default predict;
