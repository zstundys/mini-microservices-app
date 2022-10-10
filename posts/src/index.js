import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express().use(bodyParser.json(), cors());

/** @type {Record<string, Post>} */
const posts = {};

app.get("/posts", (req, res) => {
  res.send(Object.values(posts));
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  const newPost = { id, title };

  posts[id] = newPost;

  await emit({ type: "PostCreated", data: newPost });

  res.status(201).send(newPost);
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on port: 4000");
});

/**
 * @param {AnyEvent} event
 */
function emit(event) {
  return axios.post("http://127.0.0.1:4200/events", event);
}
