import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Review = () => {
  const [singleReview, setSingleReview] = useState({});

  return (
    <div className="review-page">
      <div className="single-review-card">
        <div className="vote-counter__container"></div>

        <div className="single-review-card__text-content">
          <div className="single-review-card__author-info">
            <img src="" alt="" className="author-avatar" />
            <div className="single-review-card__date"></div>
          </div>
          <p className="single-review-card__review-body"></p>
        </div>
      </div>
    </div>
  );
};

export default Review;
