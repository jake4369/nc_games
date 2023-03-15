import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getSingleReview, getUser } from "../utils/api";
import { IsLoadedContext } from "../contexts/IsLoadedContext";
import { FaReply, FaPlus, FaMinus } from "react-icons/fa";

import Loader from "../components/shared/Loader";

const SingleReview = () => {
  const [singleReview, setSingleReview] = useState({});
  const [user, setUser] = useState({});
  const params = useParams();
  const { isLoaded } = useContext(IsLoadedContext);

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

export default SingleReview;
