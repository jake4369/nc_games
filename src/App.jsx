import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { getCategories } from "./utils/api";

import Header from "./components/shared/Header";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home categories={categories} />} />
        <Route path="/reviews" elemet={<Reviews />} />
      </Routes>
    </div>
  );
};

export default App;
