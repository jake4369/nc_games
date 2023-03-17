import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IsLoadedContext } from "../contexts/IsLoadedContext";

import Loader from "../components/shared/Loader";
import ReviewCard from "../components/shared/ReviewCard";

const Reviews = ({ reviews }) => {
  const { isLoaded } = useContext(IsLoadedContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reviewCards = reviews.map((review) => {
    return <ReviewCard key={review.review_id} review={review} />;
  });

  return (
    <div className="review-page">
      <section className="reviews-section">
        <h1 className="review-page__heading">Reviews</h1>
        {!isLoaded ? (
          <Loader />
        ) : (
          <div className="review-cards__container">{reviewCards}</div>
        )}
      </section>
    </div>
  );
};

export default Reviews;
