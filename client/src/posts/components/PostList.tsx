import CommentForm from "../../comments/components/CommentForm";
import CommentList from "../../comments/components/CommentList";
import { useQueryPosts } from "../../query";
import "./PostList.css";

type Props = {};

const PostList = (props: Props) => {
  const { data } = useQueryPosts();

  if (!data) {
    return <>Loading...</>;
  }

  return (
    <div className="posts">
      {data.map((p) => (
        <article className="post" key={p.id}>
          <h2>{p.title}</h2>

          <CommentList comments={p.comments} />
          <CommentForm postId={p.id} />
        </article>
      ))}
    </div>
  );
};

export default PostList;
