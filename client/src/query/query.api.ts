import { useFetch } from "../hooks";
import { IPostWithComments } from "./model";

const endpoint = "http://localhost:4002/posts";

export function useQueryPosts() {
  return useFetch<IPostWithComments[]>(endpoint);
}
