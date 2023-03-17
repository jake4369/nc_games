import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const VoteCounter = ({ hasVoted, voteCount, handleVote }) => {
  return (
    <div className="vote-counter__container">
      <button
        className="vote-btn"
        onClick={() => handleVote(1)}
        disabled={hasVoted}
      >
        <FaPlus />
      </button>

      <span className="votes">{voteCount}</span>

      <button
        className="vote-btn"
        onClick={() => handleVote(-1)}
        disabled={hasVoted}
      >
        <FaMinus />
      </button>
    </div>
  );
};

export default VoteCounter;
