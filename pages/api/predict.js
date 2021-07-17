import axios from "axios";

export default async function predictAPI(req, res) {
  try {
    const result = await axios.post(`${process.env.API_URL}/predict/`, {
      ...req.body,
    });
    res.status(200).json(result.data);
  } catch (error) {
    res.send(error?.data?.error || "Next API error");
  }
}
