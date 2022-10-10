export interface IPostComment {
  id: string;
  content: string;
  status: "approved" | "pending" | "rejected";
}
