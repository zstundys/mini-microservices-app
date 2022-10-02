import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

/** @typedef {{ id: string, content: string }} Comment */

const app = express().use(bodyParser.json(), cors());

/** @type {Record<number, Comment[]>} */
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] ?? [];

  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id: postId } = req.params;

  const comments = commentsByPostId[postId] ?? [];
  const newComment = { id: commentId, content };

  comments.push(newComment);

  commentsByPostId[postId] = comments;

  const event = {
    type: "CommentCreated",
    data: { ...newComment, postId },
  };

  await axios.post("http://127.0.0.1:4200/events", event);

  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port: 4001");
});
