import axios from "axios";

export default async function countdownAPI(req, res) {
  try {
    const race = await axios.get(`${process.env.API_URL}/predict/`);

    const { nextRace } = race.data[0];

    const { date } = nextRace;

    const now = Date.now();

    const timeTillRace = Date.parse(date) - now;

    res.status(200).json({ nextRace, timeTillRace });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
