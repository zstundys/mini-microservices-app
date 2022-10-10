import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express().use(bodyParser.json(), cors());

/** @type {Record<string, PostWithComments>} */
const posts = {};

app.get("/posts", (req, res) => {
  res.send(Object.values(posts));
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);

  /** @type {AnyEvent} */
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, status, postId } = data;

    posts[postId].comments.push({ id, content, status });
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on port: 4002");
});
