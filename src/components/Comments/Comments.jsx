import React, { useEffect, useState } from "react";
import { getUsers } from "../../api";
import { deleteComment } from "../../api";
export default function Comments({ comments, removeComment, currentUser }) {
  const [users, setUsers] = useState([]);
  const [confirmingCommentId, setConfirmingCommentId] = useState(null);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleDeleteClick = (comment_id) => {
    setConfirmingCommentId(comment_id);
  };

  const handleConfirmDelete = () => {
    if (confirmingCommentId !== null) {
      deleteComment(confirmingCommentId)
        .then(() => {
          removeComment(confirmingCommentId);
          alert("Comment deleted successfully!");
          setConfirmingCommentId(null);
        })
        .catch((error) => {
          alert("Failed to delete comment. Please try again.");
        });
    }
  };

  const handleCancelDelete = () => {
    setConfirmingCommentId(null);
  };

  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment) => {
              const user = users.find(
                (user) => user.username === comment.author
              );
              return (
                <div key={comment.comment_id} className="comment">
                  <div className="comment-header">
                    <img
                      src={user ? user.avatar_url : "placeholder.jpg"}
                      alt="User Avatar"
                      className="avatar"
                    />
                    <span className="username">{comment.author}</span>
                  </div>
                  <p className="comment-text">{comment.body}</p>
                  <p>Votes: {comment.votes}</p>
                  <p className="comment-info">
                    Posted on <br />
                    <b>{new Date(comment.created_at).toLocaleDateString()}</b>
                  </p>
                  {comment.author === currentUser ? (
                    <>
                      <button
                        onClick={() => handleDeleteClick(comment.comment_id)}
                      >
                        Delete
                      </button>
                      {confirmingCommentId === comment.comment_id ? (
                        <div>
                          <p>Are you sure you want to delete this comment?</p>
                          <button onClick={handleConfirmDelete}>Yes</button>
                          <button onClick={handleCancelDelete}>No</button>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
