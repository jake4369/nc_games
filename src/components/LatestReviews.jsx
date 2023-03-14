import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLatestReviews } from "../utils/api";

const LatestReviews = () => {
  const [latestReviews, setLatestReviews] = useState([]);

  useEffect(() => {
    getLatestReviews().then((data) => {
      const mostRecentReviews = data.slice(0, 3);
      setLatestReviews(mostRecentReviews);
    });
  }, []);

  const latestReviewCards = latestReviews.map((review, index) => {
    return (
      <div className="latest-review-card" key={review.review_id}>
        <img
          src={review.review_img_url}
          alt=""
          className="latest-review-card__img"
        />

        <div className="latest-review-card__text-content">
          <div className="latest-review-card__number">0{index + 1}</div>
          <h3 className="latest-review-card__heading">{review.title}</h3>
        </div>
      </div>
    );
  });

  return (
    <section className="latest-reviews">
      <h2 className="latest-reviews__heading">Latest Reviews</h2>

      <div className="latest-reviews__container">{latestReviewCards}</div>

      <Link to="/reviews">
        <button className="view-all-reviews-btn">View All</button>
      </Link>
    </section>
  );
};

export default LatestReviews;
