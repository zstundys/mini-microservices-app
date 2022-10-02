import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";

/** @typedef {{ id: string, content: string }} Comment */

const app = express().use(bodyParser.json());

/** @type {Record<number, Comment[]>} */
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] ?? [];

  res.send(comments);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id: postId } = req.params;

  const comments = commentsByPostId[postId] ?? [];

  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  res.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => {
  console.log("Listening on port: 4001");
});
