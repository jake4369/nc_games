import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getSingleReview, getUser, updateVotes } from "../utils/api";
import { IsLoadedContext } from "../contexts/IsLoadedContext";
import { FaReply, FaPlus, FaMinus } from "react-icons/fa";

import Loader from "../components/shared/Loader";

const SingleReview = ({ singleReview, setSingleReview }) => {
  const [user, setUser] = useState({});
  const [err, setErr] = useState(null);
  const params = useParams();
  const { isLoaded, setIsLoaded } = useContext(IsLoadedContext);

  useEffect(() => {
    getSingleReview(params.id)
      .then((reviewData) => {
        setSingleReview(reviewData);
        if (reviewData.owner) {
          return getUser(reviewData.owner);
        }
      })
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  const handleVote = (incVotes) => {
    updateVotes(singleReview.review_id, incVotes)
      .then((updatedReview) => {
        setSingleReview((prevReview) => {
          return { ...prevReview, votes: updatedReview.votes };
        });
        setErr(null);
      })
      .catch((error) => {
        setSingleReview((prevReview) => {
          return { ...prevReview, votes: prevReview.votes + incVotes };
        });
        setErr("Something went wrong, please try again.");
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

              <button className="view-comment-btn">View Comments</button>
            </div>
          </div>
          <div className="vote-counter__container">
            <button className="vote-btn" onClick={() => handleVote(1)}>
              <FaPlus />
            </button>
            <span className="votes">{singleReview.votes}</span>
            <button className="vote-btn" onClick={() => handleVote(-1)}>
              <FaMinus />
            </button>
          </div>
        </div>
      )}
      {err ? <p className="voting-error-message">{err}</p> : null}
    </div>
  );
};

export default SingleReview;
