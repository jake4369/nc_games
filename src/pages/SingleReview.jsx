import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./../contexts/UserContext";
import {
  getSingleReview,
  getReviewComments,
  getUser,
  updateVotes,
} from "../utils/api";
import { IsLoadedContext } from "../contexts/IsLoadedContext";

import Loader from "../components/shared/Loader";
import About from "../components/shared/About";
import SingleReviewCard from "../components/SingleReviewCard";
import Comment from "../components/Comment";
import AddComment from "./../components/AddComment";
import ReviewNotFound from "./ReviewNotFound";

const SingleReview = ({ singleReview, setSingleReview }) => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [err, setErr] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState({});
  const { isLoaded } = useContext(IsLoadedContext);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    getSingleReview(params.id)
      .then((reviewData) => {
        setSingleReview(reviewData);
        setVoteCount(reviewData.votes);
        if (reviewData.owner) {
          return getUser(reviewData.owner);
        }
      })
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        if (error) {
          navigate("/review-not-found");
        }
      });
  }, []);

  useEffect(() => {
    getReviewComments(params.id)
      .then((commentsData) => {
        setComments(commentsData);
        setCommentCount(commentsData.length);
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
      })
      .catch((error) => {
        navigate("/server-error");
      });
  }, [newComment]);

  const handleShowComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const handleCommentDelete = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );
    setCommentCount((prevCount) => prevCount - 1);
  };

  const commentCards = comments.map((comment) => {
    return (
      <Comment
        key={comment.comment_id}
        userAvatar={comment.avatar_url}
        author={comment.author}
        body={comment.body}
        createdAt={comment.created_at}
        commentId={comment.comment_id}
        onDelete={handleCommentDelete}
      />
    );
  });

  const handleVote = (incVotes) => {
    const hasVoted = localStorage.getItem(
      `review_${singleReview.review_id}_voted`
    );
    if (hasVoted) {
      setErr("You have already voted on this review.");
      return;
    }

    setVoteCount((prevCount) => prevCount + incVotes);
    setErr(null);

    updateVotes(singleReview.review_id, incVotes)
      .then(() => {
        setHasVoted(true);
        localStorage.setItem(`review_${singleReview.review_id}_voted`, true);
      })
      .catch((error) => {
        setVoteCount((prevCount) => prevCount - incVotes);
        setHasVoted(false);
        localStorage.removeItem(`review_${singleReview.review_id}_voted`);
        setErr("Something went wrong, please refresh the page and try again.");
      });
  };

  const addCommentRef = useRef({});

  const handleReply = () => {
    setShowAddComment(!showAddComment);
  };

  useEffect(() => {
    if (showAddComment && addCommentRef.current) {
      addCommentRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAddComment]);

  const handleNewComment = (comment) => {
    setNewComment(comment);
  };

  if (Object.keys(singleReview).length === 0) {
    return <ReviewNotFound />;
  }

  return (
    <div className="review-page">
      {isLoaded ? (
        <>
          <About
            img={singleReview.review_img_url}
            heading={singleReview.title}
          />

          <SingleReviewCard
            key={params.id}
            user={user}
            singleReview={singleReview}
            comments={comments}
            showComments={showComments}
            loggedInUser={loggedInUser}
            handleReply={handleReply}
            handleShowComments={handleShowComments}
            hasVoted={hasVoted}
            voteCount={voteCount}
            handleVote={handleVote}
          />

          {err ? <p className="voting-error-message">{err}</p> : null}

          {showComments && (
            <div className="comments-container">
              <h2 className="comments-container__heading">Comments</h2>
              {commentCards}
            </div>
          )}

          {showAddComment && (
            <AddComment
              reviewId={params.id}
              ref={addCommentRef}
              setComments={setComments}
              handleNewComment={handleNewComment}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SingleReview;
