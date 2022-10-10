import { IPostComment } from "./post-comment.interface";

export interface IPostWithComments {
  id: string;
  title: string;
  comments: IPostComment[];
}
