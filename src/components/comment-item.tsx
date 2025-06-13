import { DateFormatter } from "../lib/helpers";
import { Comment } from "../lib/types";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  return (
    <li>
      <h4>{comment.content}</h4>
      <span className="comment-date">{DateFormatter(comment.created_at)}</span>
    </li>
  );
};

export default CommentItem;
