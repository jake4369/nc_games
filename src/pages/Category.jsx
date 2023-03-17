import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { IsLoadedContext } from "../contexts/IsLoadedContext";
import { images } from "./../assets/categories/index";

import About from "../components/shared/About";
import ReviewCard from "../components/shared/ReviewCard";
import Loader from "../components/shared/Loader";

const Category = ({ reviews, categories }) => {
  const params = useParams();
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [categoryImg, setCategoryImg] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const { isLoaded } = useContext(IsLoadedContext);

  useEffect(() => {
    const filteredReviews = reviews.filter(
      (review) => review.category === params.categoryName
    );

    const category = categories.find((obj) => obj.slug === params.categoryName);

    setCategoryReviews(filteredReviews);
    setCategoryTitle(params.categoryName.split("-").join(" "));
    setCategoryImg(images[params.categoryName.split("-").join("")]);
    setCategoryDescription(category?.description);
  }, [reviews]);

  const categoryReviewCards = categoryReviews.map((review) => {
    return <ReviewCard key={review.review_id} review={review} />;
  });

  return (
    <div className="category-page">
      {isLoaded ? (
        <>
          <About
            img={categoryImg}
            heading={categoryTitle}
            text={categoryDescription}
          />
          <div className="review-cards__container category-page__review-cards__container">
            {categoryReviewCards}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Category;
