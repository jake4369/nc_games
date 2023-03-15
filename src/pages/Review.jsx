import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviews, getUser } from "../utils/api";

const Review = () => {
  const [singleReview, setSingleReview] = useState({});
  const [user, setUser] = useState({});
  const params = useParams();

  useEffect(() => {
    getReviews()
      .then((data) => {
        const review = data.find((obj) => obj.review_id === params.id * 1);
        setSingleReview(review);
        return getUser(review.owner);
      })
      .then((data) => {
        setUser(data);
      });
  }, []);

  console.log(singleReview);

  return (
    <div className="review-page">
      <div className="single-review-card">
        <div className="vote-counter__container"></div>

        <div className="single-review-card__text-content">
          <div className="single-review-card__owner-info">
            <img src={user.avatar_url} alt="" className="owner-avatar" />
            <p className="single-review-card__owner-name">
              {singleReview.owner}
            </p>
            <div className="single-review-card__date">
              {singleReview.created_at.split("T")[0]}
            </div>
          </div>
          <h2 className="single-review-card__title">{singleReview.title}</h2>
          <p className="single-review-card__review-body">
            {singleReview.review_body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
