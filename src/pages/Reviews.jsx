const Reviews = ({ reviews }) => {
  const reviewCards = reviews.map((review) => {
    return (
      <div className="review-card" key={review.review_id}>
        <img src={review.review_img_url} alt="" className="review-card__img" />
        <div className="review-card__text-content">
          <h2 className="review-card__text-content__heading">
            {review.title.length > 20
              ? review.title.substring(0, 20) + "..."
              : review.title}
          </h2>
          <span className="review-card__text-content__category">
            {review.category.split("-").join(" ")}
          </span>

          <p className="review-card__text-content__review">
            Review by{" "}
            <span className="review-card__text-content__owner">
              {review.owner}
            </span>
          </p>

          <div className="review-card__text-content__flex-container">
            <span className="review-card__text-content__date">
              {review.created_at.split("T")[0]}
            </span>

            <span className="review-card__text-content__votes">
              Votes: {review.votes}
            </span>
          </div>

          <button className="view-review-btn">View</button>
        </div>
      </div>
    );
  });
  return (
    <div className="review-page">
      <section className="reviews-section">
        <h1 className="review-page__heading">Reviews</h1>
        <div className="review-cards__container">{reviewCards}</div>
      </section>
    </div>
  );
};

export default Reviews;
