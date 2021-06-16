import axios from "axios";

export default async function emailAPI(req, res) {
  try {
    const { email, verifyToken, id } = req.body;

    console.log("next api body", req.body);

    const emailRes = await axios.post("http://localhost:5000/auth/email", {
      email,
      verifyToken,
      id,
    });

    res.status(200).json({ success: true, data: emailRes.data });
  } catch (error) {
    console.log("email.js", error.code);
  }
}
