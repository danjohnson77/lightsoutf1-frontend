import axios from "axios";

export default async function getDriversAPI(req, res) {
  const d = new Date();
  const currentYear = d.getFullYear();
  try {
    const result = await axios.get(
      `http://ergast.com/api/f1/${currentYear}/driverStandings.json`
    );

    let drivers = [];

    result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
      (item) => {
        const {
          Driver: { givenName, familyName, driverId },
          Constructors,
        } = item;

        const { name, constructorId } = Constructors[0];

        drivers = [
          ...drivers,
          {
            name: `${givenName} ${familyName}`,
            id: driverId,
            team: name,
            teamId: constructorId,
          },
        ];
      }
    );

    res.status(200).json(drivers);
  } catch (error) {
    res.status(200).json(error.message);
  }
}
