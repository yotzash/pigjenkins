'use strict'

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Sosi mo");
});


app.listen(3000);