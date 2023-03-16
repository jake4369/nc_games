import { useState } from "react";
import { addComment } from "../utils/api";

const Comment = ({ reviewId, setComments, handleNewComment }) => {
  const [comment, setComment] = useState({
    review_id: Number(reviewId),
    author: localStorage.getItem("loggedInUser")
      ? JSON.parse(localStorage.getItem("loggedInUser")).username
      : "",
    body: "",
  });

  const handleChange = (e) => {
    setComment((prevState) => {
      return {
        ...prevState,
        body: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(comment.review_id, comment.author, comment.body).then(
      (response) => {
        console.log(response);
        setComments((prevState) => [...prevState, response]);
        handleNewComment(response);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <textarea
        name="comment"
        className="comment-textarea"
        placeholder="Add a comment... Max 255 Characters"
        value={comment.body}
        onChange={handleChange}
      ></textarea>
      <button className="send-comment-btn">SEND</button>
    </form>
  );
};

export default Comment;
