import { useState, useEffect } from "react";
import { getReviews } from "../../utils/api";

const Sort = ({ setReviews }) => {
  const [sortOption, setSortOption] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    getReviews(sortOption, sortOrder).then((data) => {
      setReviews(data);
    });
  }, [sortOption, sortOrder]);

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };
  return (
    <form className="sorting-form">
      <label htmlFor="sort-option">Sort by:</label>
      <select
        id="sort-option"
        value={sortOption}
        onChange={handleSortOptionChange}
      >
        <option value="created_at">Date</option>
        <option value="category">Category</option>
        <option value="comment_count">Comments</option>
        <option value="votes">Votes</option>
      </select>
      <label htmlFor="order-option">Order by:</label>
      <select
        id="order-option"
        value={sortOrder}
        onChange={handleSortOrderChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </form>
  );
};

export default Sort;
