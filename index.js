const express = require("express");
const app = express();

app.get("/" ,(req , res) => {
  res.json({name:"ayush"})
})

app.listen(3001)