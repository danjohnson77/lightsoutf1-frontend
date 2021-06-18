import axios from "axios";

export default async function countdownAPI(req, res) {
  try {
    const race = await axios.get("http://localhost:5000/predict/");

    const { nextRace } = race.data[1];
    const { date } = nextRace;

    const now = Date.now();

    const timeTillRace = date - now;

    res.status(200).json({ nextRace, timeTillRace });
  } catch (error) {
    console.log(error);
  }
}
