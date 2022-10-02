import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useCreateComment } from "../comments.api";
import { ICommentForm } from "../model";

type Props = {
  postId: string;
};

const CommentForm = ({ postId }: Props) => {
  const { register, handleSubmit, reset } = useForm<ICommentForm>();

  const createComment = useCreateComment(postId);

  const onSubmit = useCallback(async (formData: ICommentForm) => {
    await createComment(formData);

    reset();
  }, []);

  return (
    <>
      <strong>Create comment</strong>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="content">Title</label>
          <input
            {...register("content", { required: true })}
            id="content"
            type="text"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CommentForm;
