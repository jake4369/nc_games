import { Link } from "react-router-dom";
import { FaReply } from "react-icons/fa";
import VoteCounter from "./VoteCounter";

const SingleReviewCard = ({
  user,
  singleReview,
  comments,
  handleReply,
  handleShowComments,
  showComments,
  loggedInUser,
  hasVoted,
  voteCount,
  handleVote,
}) => {
  return (
    <div className="single-review-card">
      <div className="single-review-card__text-content">
        <div className="single-review-card__owner-info">
          <img src={user.avatar_url} alt="" className="owner-avatar" />
          <p className="single-review-card__owner-name">{singleReview.owner}</p>

          {loggedInUser.username !== "guest user" ? (
            <button className="reply-btn" onClick={handleReply}>
              <FaReply /> Reply
            </button>
          ) : (
            <Link to="/login">
              <p>Log in to reply</p>
            </Link>
          )}
        </div>
        <h2 className="single-review-card__title">{singleReview.title}</h2>
        <p className="single-review-card__review-body">
          {singleReview.review_body}
        </p>
        <div className="single-review-card__comments-container">
          <p>Comments: {comments.length}</p>

          {singleReview.comment_count > 0 && (
            <button className="view-comment-btn" onClick={handleShowComments}>
              {!showComments ? "View Comments" : "Hide Comments"}
            </button>
          )}
        </div>
      </div>
      <VoteCounter
        hasVoted={hasVoted}
        voteCount={voteCount}
        handleVote={handleVote}
      />
    </div>
  );
};

export default SingleReviewCard;
