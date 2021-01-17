const express = require("express");
const axios = require("axios");

const app = express();

const getBase = async (req, res) => {
  try {
    const base = req.query.base;
    const cur = req.query.currency;
    let data;
    if (base && cur) {
      data = await axios.get(
        `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${cur.toUpperCase()}`
      );
      const result = data.data;
      res.json({ results: result });
    } else if (base) {
      data = await axios.get(
        `https://api.exchangeratesapi.io/latest?base=${base}`
      );
      const result = data.data;
      res.json({ results: result });
    }
    data = await axios.get(`https://api.exchangeratesapi.io/latest`);
    const result = data.data;
    res.json({ results: result });
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to Enye-Tech Backend Challenge");
});

app.get("/api/rates", getBase);

app.all("*", (req, res, next) => {
  res.send(`Can't find ${req.originalUrl} on this server!`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
