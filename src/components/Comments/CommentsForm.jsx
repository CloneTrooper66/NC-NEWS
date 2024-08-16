import React, { useState } from "react";
import { postComment } from "../../api";

export default function CommentsForm({ article_id, activeUser, addComment }) {
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    setIsSubmittingComment(true);

    postComment(article_id, activeUser, newComment)
      .then((newComment) => {
        addComment(newComment);
        setNewComment("");
        setIsSubmittingComment(false);
        alert("Comment submitted successfully!");
      })
      .catch((error) => {
        setIsSubmittingComment(false);
        alert("Failed to submit comment. Please try again.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmitComment}>
        <textarea
          rows="4"
          cols="50"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          required
        />
        <br />
        <button type="submit" disabled={isSubmittingComment}>
          {isSubmittingComment ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </div>
  );
}
