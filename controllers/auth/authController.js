import express from "express";
import jsonwebtoken from "jsonwebtoken";


const router = express.Router();

router.post("/sign-in", (req, res) => {
  // Authenticate
  const username = req.body.username
  console.log(username)
  const user = {name : username}
  const token = jsonwebtoken.sign(user , process.env.access_token_secret);

  res.send(token);
});

export default router; // Export the router as a default export
