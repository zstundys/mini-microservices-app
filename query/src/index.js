import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";

const app = express().use(bodyParser.json(), cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(Object.values(posts));
});

app.post("/posts", async (req, res) => {
  res.status(201).send({});
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on port: 4002");
});
