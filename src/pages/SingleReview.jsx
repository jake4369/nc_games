import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getSingleReview,
  getReviewComments,
  getUser,
  updateVotes,
} from "../utils/api";
import { IsLoadedContext } from "../contexts/IsLoadedContext";
import { FaReply, FaPlus, FaMinus } from "react-icons/fa";

import Loader from "../components/shared/Loader";
import Comment from "../components/Comment";

const SingleReview = ({ singleReview, setSingleReview }) => {
  const [user, setUser] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [err, setErr] = useState(null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const params = useParams();
  const { isLoaded, setIsLoaded } = useContext(IsLoadedContext);

  useEffect(() => {
    getSingleReview(params.id)
      .then((reviewData) => {
        setSingleReview(reviewData);
        setVoteCount(reviewData.votes);
        if (reviewData.owner) {
          return getUser(reviewData.owner);
        }
      })
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  useEffect(() => {
    getReviewComments(params.id).then((commentsData) => {
      setComments(commentsData);
      const usersData = commentsData.map((comment) => {
        return getUser(comment.author);
      });
      Promise.all(usersData).then((users) => {
        setComments((prevComments) => {
          return prevComments.map((comment, index) => {
            return { ...comment, avatar_url: users[index].avatar_url };
          });
        });
      });
    });
  }, []);

  const handleShowComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const commentCards = comments.map((comment) => {
    return (
      <Comment
        key={comment.comment_id}
        userAvatar={comment.avatar_url}
        author={comment.author}
        body={comment.body}
        createdAt={comment.created_at}
      />
    );
  });

  const handleVote = (incVotes) => {
    const hasVoted = localStorage.getItem(
      `review_${singleReview.review_id}_voted`
    );
    if (hasVoted) {
      setErr("You have already voted on this review.");
      return;
    }

    setVoteCount((prevCount) => prevCount + incVotes);
    setErr(null);

    updateVotes(singleReview.review_id, incVotes)
      .then(() => {
        setHasVoted(true);
        localStorage.setItem(`review_${singleReview.review_id}_voted`, true);
      })
      .catch((error) => {
        setVoteCount((prevCount) => prevCount - incVotes);
        setHasVoted(false);
        localStorage.removeItem(`review_${singleReview.review_id}_voted`);
        setErr("Something went wrong, please refresh the page and try again.");
      });
  };

  return (
    <div className="review-page">
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="single-review-card">
          <div className="single-review-card__text-content">
            <div className="single-review-card__owner-info">
              <img src={user.avatar_url} alt="" className="owner-avatar" />
              <p className="single-review-card__owner-name">
                {singleReview.owner}
              </p>

              <button className="reply-btn">
                <FaReply /> Reply
              </button>
            </div>
            <h2 className="single-review-card__title">{singleReview.title}</h2>
            <p className="single-review-card__review-body">
              {singleReview.review_body}
            </p>
            <div className="single-review-card__comments-container">
              <p>Comments: {singleReview.comment_count}</p>

              {singleReview.comment_count > 0 && (
                <button
                  className="view-comment-btn"
                  onClick={handleShowComments}
                >
                  {!showComments ? "View Comments" : "Hide Comments"}
                </button>
              )}
            </div>
          </div>
          <div className="vote-counter__container">
            <button
              className="vote-btn"
              onClick={() => handleVote(1)}
              disabled={hasVoted}
            >
              <FaPlus />
            </button>

            <span className="votes">{voteCount}</span>

            <button
              className="vote-btn"
              onClick={() => handleVote(-1)}
              disabled={hasVoted}
            >
              <FaMinus />
            </button>
          </div>
        </div>
      )}
      {err ? <p className="voting-error-message">{err}</p> : null}

      {showComments && (
        <div className="comments-container">
          <h2 className="comments-container__heading">Comments</h2>
          {commentCards}
        </div>
      )}
    </div>
  );
};

export default SingleReview;
