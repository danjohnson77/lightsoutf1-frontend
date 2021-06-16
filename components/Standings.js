import { useState, useEffect } from "react";
import Loading from "./Loading";
import gsap from "gsap";

const Standings = () => {
  const [state, setState] = useState({ season: "current", type: "Driver" });
  const [loading, setLoading] = useState(true);
  const [standingsTable, setStandingsTable] = useState(null);

  useEffect(async () => {
    try {
      setLoading(true);
      const standingsRes =
        await fetch(`http://localhost:3000/api/standings?season=${state.season}&type=${state.type}
      `);

      const standings = await standingsRes.json();
      !state && setState(standings);

      setStandingsTable(standings.standingsTable);
      setLoading(false);

      gsap.to(".standings-list", { opacity: 1, duration: 0.7 });
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const getYears = () => {
    let years = [];
    const d = new Date();
    const currentYear = d.getFullYear();
    let startYear = state.type === "Driver" ? 1950 : 1958;

    for (let i = startYear; i <= currentYear; i++) {
      years.push(startYear);
      startYear += 1;
    }

    return years.reverse();
  };

  return (
    <>
      <h1 className="flex-none">STANDINGS</h1>
      <section>
        <div className="flex flex-col  bg-offBlack h-full">
          <div className="flex flex-none justify-between mx-auto w-11/12 py-2">
            <select
              name="season"
              id="season"
              className="bg-transparent"
              onChange={handleChange}
            >
              {getYears().map((year, index) => {
                return (
                  <option
                    key={index}
                    value={year}
                    defaultValue={state && state.season === year}
                  >
                    {year}
                  </option>
                );
              })}
            </select>
            <select
              name="type"
              id="type"
              className="bg-transparent w-full"
              onChange={handleChange}
            >
              <option value="Driver">DRIVERS</option>
              <option value="Constructor">CONSTRUCTORS</option>
            </select>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <table className="font-secondary table-fixed text-center text-sm flex-grow alt-list opacity-0 standings-list">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>{state.type === "Driver" ? "Team" : "Wins"}</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {standingsTable &&
                  standingsTable.map(
                    (
                      {
                        position,
                        points,
                        name,
                        driverUrl,
                        teamName,
                        teamUrl,
                        wins,
                      },
                      index
                    ) => {
                      return (
                        <tr key={index}>
                          <td>{position}</td>
                          <td>
                            <a href={driverUrl} target="_blank">
                              {name}
                            </a>
                          </td>
                          <td>
                            {state.type === "Driver" ? (
                              <a href={teamUrl} target="_blank">
                                {teamName}
                              </a>
                            ) : (
                              <p>{wins}</p>
                            )}
                          </td>
                          <td>{points}</td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
};

export default Standings;
