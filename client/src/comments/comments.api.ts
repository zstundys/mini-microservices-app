import { useFetch, usePostRequest } from "../hooks";
import { IComment, ICommentForm } from "./model";

const endpoint = "http://localhost:4001/posts/:postId/comments";

export function useComments(postId: string) {
  return useFetch<IComment[]>(endpoint.replace(":postId", postId));
}

export function useCreateComment(postId: string) {
  const url = endpoint.replace(":postId", postId);
  return usePostRequest<ICommentForm>(url, "http://localhost:4002/posts");
}
