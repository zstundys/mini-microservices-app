import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express().use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://127.0.0.1:4000/events", event).catch(console.error);
  axios.post("http://127.0.0.1:4001/events", event).catch(console.error);
  axios.post("http://127.0.0.1:4002/events", event).catch(console.error);
  axios.post("http://127.0.0.1:4003/events", event).catch(console.error);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4200, () => {
  console.log("Listening on port 4200");
});
