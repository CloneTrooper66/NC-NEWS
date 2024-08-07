import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../LoadingScreen/Loading";
import { fetchArticles, fetchComments } from "../../api";
import "../../styles/comments.css";
import { getUsers } from "../../api";

export default function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(article_id)
      .then((data) => {
        setArticle(data);
        return fetchComments(article_id);
      })
      .then((comments) => {
        setComments(comments);
        return getUsers();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [article_id]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.article_title} />
      <p>{article.body}</p>
      <div className="comments-section">
        <h2>Comments</h2>
        <div className="comments-list">
          {comments.map((comment) => {
            const user = users.find((user) => user.username === comment.author);
            return (
              <div key={comment.comment_id} className="comment">
                <div className="comment-header">
                  <img
                    src={user.avatar_url}
                    alt="User Avatar"
                    className="avatar"
                  />
                  <span className="username">{user.username}</span>
                </div>
                <p className="comment-text">{comment.body}</p>
                <p>Votes: {comment.votes}</p>
                <p className="comment-info">
                  Posted by <strong>{comment.author}</strong> on <br />
                  <b>{new Date(comment.created_at).toLocaleDateString()}</b>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
