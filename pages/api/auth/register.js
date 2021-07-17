import axios from "axios";

export default async function registerAPI(req, res) {
  try {
    const result = await axios.post(`${process.env.API_URL}/auth/register`, {
      ...req.body,
    });

    res.status(200).json(result.data);
  } catch (error) {
    const { data, status } = error.response;
    res.status(status).send(data);
    console.log(data);
  }
}
