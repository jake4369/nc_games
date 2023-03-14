import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { getCategories } from "./utils/api";
import { getReviews } from "./utils/api";

import Header from "./components/shared/Header";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, [categories]);

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
    });
  }, [reviews]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home categories={categories} />} />
        <Route path="/reviews" element={<Reviews reviews={reviews} />} />
      </Routes>
    </div>
  );
};

export default App;
