import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

/** @typedef {{ id: string, content: string, status: 'pending' | 'approved' | 'rejected' }} Comment */

const app = express().use(bodyParser.json(), cors());

/** @type {Record<string, Comment[]>} */
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const comments = commentsByPostId[id] ?? [];

  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { id: postId } = req.params;

  /** @type {Comment} */
  const newComment = {
    id: randomBytes(4).toString("hex"),
    content: req.body.content,
    status: "pending",
  };

  /** @type {Comment[]} */
  const comments = commentsByPostId[postId] ?? [];

  comments.push(newComment);

  commentsByPostId[postId] = comments;

  await emit({
    type: "CommentCreated",
    data: { ...newComment, postId },
  });

  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  console.log("Received event", req.body.type);

  /** @type {AnyEvent} */
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((c) => c.id === id);

    comment.status = status;

    await emit({
      type: "CommentUpdated",
      data: { ...comment, postId },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port: 4001");
});

/**
 * @param {AnyEvent} event
 */
function emit(event) {
  return axios.post("http://127.0.0.1:4200/events", event);
}
