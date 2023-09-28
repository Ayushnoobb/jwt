const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const router = express.Router();

router.post('/sign-in', (req, res) => {
  // Authenticate
  const username = req.body.username;
  console.log(username);
  const user = { name: username };
  const token = jsonwebtoken.sign(user, process.env.access_token_secret);

  res.send(token);
});

router.get("/sign-in" , (req , res) => {
  res.send("authCONtroller")
})

module.exports = router; // Export the router as a default export
