import axios from "axios";
import { useCallback } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useFetch, usePostRequest, useReload } from "../hooks";
import { IPostForm } from "../posts";
import { IComment, ICommentForm } from "./model";

const endpoint = "http://localhost:4001/posts/:postId/comments";

export function useComments(postId: string) {
  return useFetch<IComment[]>(endpoint.replace(":postId", postId));
}

export function useCreateComment(postId: string) {
  const url = endpoint.replace(":postId", postId);
  return usePostRequest<ICommentForm>(url, "http://localhost:4002/posts");
}
