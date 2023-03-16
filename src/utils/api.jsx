import axios from "axios";

const reviewsApi = axios.create({
  baseURL: "https://nc-games-api-yf5t.onrender.com/api",
});

export const getCategories = () => {
  return reviewsApi.get("/categories").then(({ data }) => {
    return data.categories;
  });
};

export const getReviews = () => {
  return reviewsApi.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};

export const getSingleReview = (reviewId) => {
  return reviewsApi.get(`/reviews/${reviewId}`).then(({ data }) => {
    return data.review;
  });
};

export const getLatestReviews = () => {
  return reviewsApi
    .get("/reviews?sort_by=created_at&order=desc")
    .then(({ data }) => {
      return data.reviews;
    });
};

export const getUsers = () => {
  return reviewsApi.get("/users").then((data) => {
    return data.data.users;
  });
};

export const getUser = (username) => {
  return reviewsApi.get(`/users/${username}`).then((data) => {
    return data.data.user;
  });
};

export const updateVotes = (reviewId, incVotes) => {
  return reviewsApi
    .patch(`/reviews/${reviewId}`, { incVotes: incVotes })
    .then((response) => {
      return response.data.review;
    });
};
