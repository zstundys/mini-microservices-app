import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";

const app = express().use(bodyParser.json(), cors());

/** @typedef {{ id: string; content: string; }} PostComment */
/** @typedef {{ id: string; title: string; comments: PostComment[]; }} PostWithComments */

/** @type {Record<string, PostWithComments>} */
const posts = {};

app.get("/posts", (req, res) => {
  res.send(Object.values(posts));
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);

  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    posts[postId].comments.push({ id, content });
  }

  console.log(posts);

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on port: 4002");
});
