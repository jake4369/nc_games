import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getReviews, getUser } from "../utils/api";
import { IsLoadedContext } from "../contexts/IsLoadedContext";
import { FaReply, FaPlus, FaMinus } from "react-icons/fa";

import Loader from "../components/shared/Loader";

const Review = () => {
  const [singleReview, setSingleReview] = useState({});
  const [user, setUser] = useState({});
  const params = useParams();
  const { isLoaded } = useContext(IsLoadedContext);

  useEffect(() => {
    getReviews()
      .then((reviewData) => {
        const review = reviewData.find(
          (obj) => obj.review_id === params.id * 1
        );
        setSingleReview(review);
        return getUser(review.owner);
      })
      .then((userData) => {
        setUser(userData);
      });
  }, []);

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
            <button className="vote-btn">
              <FaPlus />
            </button>
            <span className="votes">{singleReview.votes}</span>
            <button className="vote-btn">
              <FaMinus />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
