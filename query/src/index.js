import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express().use(bodyParser.json(), cors());

/** @type {Record<string, PostWithComments>} */
const posts = {};

app.get("/posts", (req, res) => {
  res.send(Object.values(posts));
});

app.post("/events", (req, res) => {
  handleEvent(req.body);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on port: 4002");

  await synchronizeEvents();
});

async function synchronizeEvents() {
  console.log("Synchronizing events");

  /** @type {AnyEvent[]} */
  const events = await axios
    .get(" http://localhost:4200/events")
    .then((response) => response.data);

  for (const event of events) {
    handleEvent(event);
  }
}

/** @param {AnyEvent} arg0 */
function handleEvent({ type, data }) {
  console.log("Handling event: ", type);

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, status, postId } = data;

    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, status, postId } = data;

    const comment = posts[postId].comments.find((c) => c.id === id);

    comment.status = status;
    comment.content = content;
  }
}
