declare interface Post {
  id: string;
  title: string;
}

declare type CommentStatus = "pending" | "approved" | "rejected";

declare interface PostComment {
  id: string;
  content: string;
  status: CommentStatus;
}

declare interface PostWithComments {
  id: string;
  title: string;
  comments: PostComment[];
}

declare interface EventEnvelope<T extends string, D> {
  readonly type: T;
  readonly data: D;
}

declare interface CommentCreatedEvent
  extends EventEnvelope<"CommentCreated", PostComment & { postId: string }> {}

declare interface CommentUpdatedEvent
  extends EventEnvelope<"CommentUpdated", PostComment & { postId: string }> {}

declare interface CommentModeratedEvent
  extends EventEnvelope<"CommentModerated", PostComment & { postId: string }> {}

declare interface PostCreatedEvent
  extends EventEnvelope<"PostCreated", { id: string; title: string }> {}

declare type AnyEvent =
  | CommentCreatedEvent
  | CommentUpdatedEvent
  | CommentModeratedEvent
  | PostCreatedEvent;
