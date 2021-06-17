import axios from "axios";

export default async function getRaceAPI(req, res) {
  try {
    const result = await axios.get("http://localhost:5000/predict");
    res.status(200).json(result.data[1].nextRace);
  } catch (error) {
    console.log(error);
  }
}
