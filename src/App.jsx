import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { getCategories } from "./utils/api";
import { getReviews } from "./utils/api";
import { IsLoadedContext } from "./contexts/IsLoadedContext";

// Components
import Header from "./components/shared/Header";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Reviews from "./pages/Reviews";
import SingleReview from "./pages/SingleReview";
import PathNotFound from "./pages/PathNotFound";
import CategoryNotFound from "./pages/CategoryNotFound";
import ReviewNotFound from "./pages/ReviewNotFound";
import ServerError from "./pages/ServerError";
import Footer from "./components/shared/Footer";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [singleReview, setSingleReview] = useState({});
  const { setIsLoaded } = useContext(IsLoadedContext);

  useEffect(() => {
    setIsLoaded(false);
    getCategories().then((data) => {
      setCategories(data);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    getReviews().then((data) => {
      setReviews(data);
      setIsLoaded(true);
    });
  }, [singleReview]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home categories={categories} />} />
        <Route
          path="category/:categoryName"
          element={<Category reviews={reviews} categories={categories} />}
        />
        <Route
          path="/reviews"
          element={<Reviews reviews={reviews} setReviews={setReviews} />}
        />
        <Route
          path="/reviews/:id"
          element={
            <SingleReview
              singleReview={singleReview}
              setSingleReview={setSingleReview}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/category-not-found" element={<CategoryNotFound />} />
        <Route path="/review-not-found" element={<ReviewNotFound />} />
        <Route path="*" element={<PathNotFound />} />
        <Route path="/server-error" element={<ServerError />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
