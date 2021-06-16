import axios from "axios";

export default async function verifyAPI(req, res) {
  const { token, id } = req.body;

  try {
    const result = await axios.post("http://localhost:5000/auth/verify", {
      token,
      id,
    });

    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
  }
}
