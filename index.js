const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/search", async (req, res) => {
  const query = req.query;
  const formattedQuery = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  console.log(req.headers.authorization, req.headers);
  const response = await fetch(
    `https://api.yelp.com/v3/businesses/search${
      formattedQuery ? "?" + formattedQuery : ""
    }`,
    {
      headers: {
        Authorization: req.headers.authorization,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  res.send(data);
});

app.get("/health", (req, res) => {
  res.send("Health is good");
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
