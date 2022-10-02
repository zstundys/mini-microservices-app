import { useComments } from "../comments.api";

type Props = {
  postId: string;
};

const CommentList = (props: Props) => {
  const { data } = useComments(props.postId);

  return (
    <div>
      Comments:
      {data ? (
        <ul>
          {data.map((d) => (
            <li key={d.id}>{d.content} </li>
          ))}{" "}
        </ul>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default CommentList;
