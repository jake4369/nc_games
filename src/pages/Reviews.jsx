const Reviews = ({ reviews }) => {
  console.log(reviews);

  const reviewCards = reviews.map((review) => {
    return (
      <div className="review-card" key={review.review_id}>
        <img src={review.review_img_url} alt="" className="review-card__img" />
        <div className="review-card__text-content">
          <h2 className="review-card__text-content__heading">{review.title}</h2>
          <span className="review-card__text-content__category">
            {review.category}
          </span>
          <span className="review-card__text-content__owner">
            {review.owner}
          </span>
          <p className="review-card__text-content__review">
            {review.review_body}
          </p>

          <div className="review-card__text-content__flex-container">
            <span className="review-card__text-content__date">
              {review.created_at}
            </span>

            <span className="review-card__text-content__votes">
              {review.votes}
            </span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="review-cards__container">{reviewCards}</div>
    </div>
  );
};

export default Reviews;
