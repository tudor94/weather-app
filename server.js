const darksky_api_key = process.env.MY_KEY;
const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(express.static("public"));
app.post("/weather", (req, res) => {
  const url = `https://api.darksky.net/forecast/${darksky_api_key}/${
    req.body.latitude
  },${req.body.longitude}?units=uk2`;
  axios({
    url: url,
    responseType: "json"
  }).then(data => res.json(data.data.currently));
});

app.listen(5000);
