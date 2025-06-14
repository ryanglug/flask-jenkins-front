import { useQuery } from "@tanstack/react-query";
import "../styles/comments-list.scss";
import { useAuth } from "../contexts/auth-context";
import { authedApi } from "../lib/api";
import CommentItem from "./comment-item";
import { Comment } from "../lib/types";

const getComments = async (accessToken: string) => {
  try {
    const res = await authedApi(accessToken).get("/comment");

    const data = res.data.comments;

    return data as Comment[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get comments");
  }
};

const CommentsList = () => {
  const { accessToken } = useAuth();

  const { data, error, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(accessToken!),
    enabled: !!accessToken,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  if (data?.length === 0) return <p>No comments yet...</p>;

  return (
    <ul className="comment-list">
      {data &&
        data.map((comment, i) => (
          <CommentItem
            comment={comment}
            key={`user-comment=${comment.content}-${comment.id}`}
          />
        ))}
    </ul>
  );
};

export default CommentsList;
