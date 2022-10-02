import CommentForm from "../../comments/components/CommentForm";
import CommentList from "../../comments/components/CommentList";
import { usePosts } from "../posts.api";
import "./PostList.css";

type Props = {};

const PostList = (props: Props) => {
  const { data } = usePosts();

  if (!data) {
    return <>Loading...</>;
  }

  return (
    <div className="posts">
      {data.map((p) => (
        <div className="post" key={p.id}>
          <h4>{p.title}</h4>

          <CommentList postId={p.id} />
          <CommentForm postId={p.id} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
