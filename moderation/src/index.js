import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express().use(bodyParser.json());

app.post("/events", async (req, res) => {
  /** @type {AnyEvent} */
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    await emit({
      type: "CommentModerated",
      data: {
        content: data.content,
        postId: data.postId,
        id: data.id,
        status: data.content.includes("orange") ? "rejected" : "approved",
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on port 4003");
});

/**
 * @param {AnyEvent} event
 */
function emit(event) {
  return axios.post("http://127.0.0.1:4200/events", event);
}
