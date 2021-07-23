import axios from "axios";

export default async function getRaceAPI(req, res) {
  try {
    const result = await axios.get(`${process.env.API_URL}/predict/`);
    res.status(200).json(result.data[0].nextRace);
  } catch (error) {
    console.log(error);
  }
}
