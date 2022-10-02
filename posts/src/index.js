import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";

const app = express().use(bodyParser.json(), cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(Object.values(posts));
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  console.log(req.body);

  return res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on port: 4000");
});
