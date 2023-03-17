import { useState } from "react";
import { addComment } from "../utils/api";
import { forwardRef } from "react";

const Comment = forwardRef(
  ({ reviewId, setComments, handleNewComment }, ref) => {
    const [comment, setComment] = useState({
      review_id: Number(reviewId),
      author: localStorage.getItem("loggedInUser")
        ? JSON.parse(localStorage.getItem("loggedInUser")).username
        : "",
      body: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

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
      if (comment.body !== "") {
        setIsSubmitting(true);
        addComment(comment.review_id, comment.author, comment.body)
          .then((response) => {
            setComments((prevState) => [...prevState, response]);
            handleNewComment(response);
            setIsSubmitting(false);
            setComment((prevState) => {
              return {
                ...prevState,
                body: "",
              };
            });
            setErrorMessage(null);
          })
          .catch((error) => {
            setIsSubmitting(false);
            setErrorMessage("Message failed to send!");
          });
      }
    };

    return (
      <form onSubmit={handleSubmit} className="add-comment-form">
        <textarea
          name="comment"
          className="comment-textarea"
          placeholder="Add a comment... Max 255 Characters"
          value={comment.body}
          onChange={handleChange}
          ref={ref}
        ></textarea>
        <button className="send-comment-btn" disabled={isSubmitting}>
          {isSubmitting ? "..." : "SEND"}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    );
  }
);

export default Comment;
