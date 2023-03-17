import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteComment } from "../utils/api";
import { FaTrash } from "react-icons/fa";
import BouncingDotsLoader from "./shared/BouncingDotsLoader";

const Comment = ({
  userAvatar,
  author,
  body,
  createdAt,
  commentId,
  onDelete,
}) => {
  const { loggedInUser } = useContext(UserContext);
  const [setIsDeleted] = useState(false);
  const [viewTrashIcon, setViewTrashIcon] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  const handleDelete = () => {
    setIsDeleted(false);
    setViewTrashIcon(false);
    setHasFailed(false);

    deleteComment(commentId)
      .then((response) => {
        setIsDeleted(true);
        setViewTrashIcon(true);
        onDelete(commentId);
      })
      .catch((error) => {
        setHasFailed(true);
      });
  };

  return (
    <div className="comment-card">
      <div className="comment-card__author-info">
        <img src={userAvatar} alt="" className="comment-card__author-avatar" />
        <p className="comment-card__author-name">{author}</p>
        {loggedInUser.username === author && (
          <>
            {viewTrashIcon ? (
              <FaTrash className="trash-icon" onClick={handleDelete} />
            ) : !hasFailed ? (
              <BouncingDotsLoader />
            ) : (
              <p className="delete-error-message">Failed to delete comment</p>
            )}
          </>
        )}
      </div>
      <p className="comment-card__body">{body}</p>
      <p className="comment-card__date">{createdAt.split("T")[0]}</p>
    </div>
  );
};

export default Comment;
