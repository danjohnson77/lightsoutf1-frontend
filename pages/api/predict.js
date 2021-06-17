import axios from "axios";

export default async function predictAPI(req, res) {
  try {
    const result = await axios.post(`http://localhost:5000/predict`, {
      ...req.body,
    });
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
  }
}
