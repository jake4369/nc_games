import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getSingleReview, getUser, getReviewComments } from "../utils/api";
import { IsLoadedContext } from "../contexts/IsLoadedContext";
import { FaReply, FaPlus, FaMinus } from "react-icons/fa";

import Loader from "../components/shared/Loader";
import Comment from "../components/Comment";

const SingleReview = () => {
  const params = useParams();
  const { isLoaded } = useContext(IsLoadedContext);
  const [singleReview, setSingleReview] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    getSingleReview(params.id)
      .then((reviewData) => {
        setSingleReview(reviewData);
        if (reviewData.owner) {
          return getUser(reviewData.owner);
        }
      })
      .then((userData) => {
        setUser(userData);
      });
  }, []);

  useEffect(() => {
    getReviewComments(params.id).then((commentsData) => {
      setComments(commentsData);
      const usersData = commentsData.map((comment) => {
        return getUser(comment.author);
      });
      Promise.all(usersData).then((users) => {
        setComments((prevComments) => {
          return prevComments.map((comment, index) => {
            return { ...comment, avatar_url: users[index].avatar_url };
          });
        });
      });
    });
  }, []);

  const handleShowComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const commentCards = comments.map((comment) => {
    return (
      <Comment
        key={comment.comment_id}
        userAvatar={comment.avatar_url}
        author={comment.author}
        body={comment.body}
        createdAt={comment.created_at}
      />
    );
  });

  return (
    <div className="review-page">
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="single-review-card">
          <div className="single-review-card__text-content">
            <div className="single-review-card__owner-info">
              <img src={user.avatar_url} alt="" className="owner-avatar" />
              <p className="single-review-card__owner-name">
                {singleReview.owner}
              </p>

              <button className="reply-btn">
                <FaReply /> Reply
              </button>
            </div>
            <h2 className="single-review-card__title">{singleReview.title}</h2>
            <p className="single-review-card__review-body">
              {singleReview.review_body}
            </p>
            <div className="single-review-card__comments-container">
              <p>Comments: {singleReview.comment_count}</p>

              {comments.length > 0 && (
                <button
                  className="view-comment-btn"
                  onClick={handleShowComments}
                >
                  {!showComments ? "View Comments" : "Hide Comments"}
                </button>
              )}
            </div>
          </div>
          <div className="vote-counter__container">
            <button className="vote-btn">
              <FaPlus />
            </button>
            <span className="votes">{singleReview.votes}</span>
            <button className="vote-btn">
              <FaMinus />
            </button>
          </div>
        </div>
      )}

      {showComments && (
        <div className="comments-container">
          <h2 className="comments-container__heading">Comments</h2>
          {commentCards}
        </div>
      )}
    </div>
  );
};

export default SingleReview;
