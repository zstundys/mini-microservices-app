import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express().use(bodyParser.json());

app.post("/events", async (req, res) => {
  /** @type {AnyEvent} */
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    /** @type {CommentStatus} */
    const status = data.content.includes("orange") ? "rejected" : "approved";

    /** @type {CommentModeratedEvent} */
    const event = {
      type: "CommentModerated",
      data: {
        content: data.content,
        postId: data.postId,
        id: data.id,
        status,
      },
    };

    await axios.post("http://localhost:4200/events", event);
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on port 4003");
});
