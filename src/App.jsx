import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { getCategories } from "./utils/api";
import { getReviews } from "./utils/api";

import { IsLoadedContext } from "./contexts/IsLoadedContext";

import Header from "./components/shared/Header";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { isLoaded, setIsLoaded } = useContext(IsLoadedContext);

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
  }, []);

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
