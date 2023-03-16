const Comment = ({ userAvatar, author, body, createdAt }) => {
  return (
    <div className="comment-card">
      <div className="comment-card__author-info">
        <img src={userAvatar} alt="" className="comment-card__author-avatar" />
        <p className="comment-card__author-name">{author}</p>
      </div>
      <p className="comment-card__body">{body}</p>
      <p className="comment-card__date">{createdAt.split("T")[0]}</p>
    </div>
  );
};

export default Comment;
