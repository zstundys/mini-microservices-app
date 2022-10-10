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
          comments.map((d) => <li key={d.id}>{d.content}</li>)
        ) : (
          <li className="text-muted">Empty</li>
        )}
      </ul>
    </div>
  );
};

export default CommentList;
