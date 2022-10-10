import { IPostComment } from "../../query";

type Props = {
  comments: IPostComment[];
};

const CommentList = ({ comments }: Props) => {
  return (
    <div>
      Comments:
      <ul>
        {comments.length ? (
          comments.map((d) => {
            let content;

            switch (d.status) {
              case "pending":
                content = "👁️ This comment is awaiting moderation";
                break;
              case "rejected":
                content = "⛔ This comment is rejected";
                break;
              case "approved":
                content = `✅ ${d.content}`;
                break;
            }

            return <li key={d.id}>{content}</li>;
          })
        ) : (
          <li className="text-muted">Empty</li>
        )}
      </ul>
    </div>
  );
};

export default CommentList;
