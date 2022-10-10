import { useFetch, usePostRequest } from "../hooks";
import { IPost, IPostForm } from "./model";

const endpoint = "http://localhost:4000/posts";

export function usePosts() {
  return useFetch<IPost[]>(endpoint);
}

export function useCreatePost() {
  return usePostRequest<IPostForm>(endpoint, "http://localhost:4002/posts");
}
