import axios from "axios";

export default async function standingsAPI(req, res) {
  let standingsType = `${req.query.type}Standings`;

  const standings = await axios.get(
    `http://ergast.com/api/f1/${req.query.season}/${standingsType}.json`
  );

  const { StandingsLists } = standings.data.MRData.StandingsTable;

  const { season, round } = StandingsLists[0];

  let sorted = { season };

  switch (standingsType) {
    case "DriverStandings":
      sorted = {
        ...sorted,
        round,
        standingsTable: StandingsLists[0].DriverStandings.map((driver) => {
          const {
            position,
            points,
            Driver: { givenName, familyName, url: driverUrl },
          } = driver;

          const {
            name: teamName,
            url: teamUrl,
            constructorId: teamId,
          } = driver.Constructors[0];

          return {
            position,
            points,
            name: `${givenName} ${familyName}`,
            driverUrl,
            teamName,
            teamUrl,
            teamId,
          };
        }),
      };

      break;
    case "ConstructorStandings":
      sorted = {
        ...sorted,
        standingsTable: StandingsLists[0].ConstructorStandings.map((team) => {
          const {
            position,
            points,
            wins,
            Constructor: { name, constructorId: teamId, url: teamUrl },
          } = team;

          return {
            position,
            points,
            name,
            wins,
            teamUrl,
            teamId,
          };
        }),
      };
      break;
    default:
      return "Invalid Standings Type";
  }

  res.status(200).json(sorted);
}
