import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IPostForm } from "../model";
import { useCreatePost } from "../posts.api";

type Props = {};

const PostForm = (props: Props) => {
  const { register, handleSubmit, reset } = useForm<IPostForm>();

  const createPost = useCreatePost();

  const onSubmit = useCallback(async (formData: IPostForm) => {
    await createPost(formData);

    reset();
  }, []);

  return (
    <>
      <h1>Create post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            {...register("title", { required: true })}
            id="title"
            type="text"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PostForm;
