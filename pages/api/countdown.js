import axios from "axios";

export default async function countdownAPI(req, res) {
  const allRaces = await axios.get("https://ergast.com/api/f1/current.json");

  const { Races: races } = allRaces.data.MRData.RaceTable;

  let nextRaceTime;
  const now = Date.now();
  const filtered = races.find((race) => {
    const date = race.date + "T" + race.time;

    const d = new Date(date);

    const parsed = Date.parse(d);

    nextRaceTime = parsed;
    return parsed > now;
  });

  const {
    season,
    round,
    raceName: name,
    date,
    time,
    url,
    Circuit: {
      circuitName,
      url: circuitUrl,
      Location: { lat, long, locality, country },
    },
  } = filtered;

  const timeTillRace = nextRaceTime - now;

  const nextRace = {
    season,
    name,
    round,
    date,
    time,
    circuitName,
    lat,
    long,
    locality,
    country,
    url,
    circuitUrl,
  };

  res.status(200).json({ nextRace, timeTillRace });
}
