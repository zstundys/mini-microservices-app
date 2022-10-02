import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express().use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  axios.post("http://127.0.0.1:4000/events", event);
  axios.post("http://127.0.0.1:4001/events", event);
  axios.post("http://127.0.0.1:4002/events", event);

  return res.send({ status: "OK" });
});

app.listen(4200, () => {
  console.log("Listening on port 4200");
});
