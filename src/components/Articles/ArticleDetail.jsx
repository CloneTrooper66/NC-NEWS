import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../LoadingScreen/Loading";
import { fetchArticles, fetchComments, updateArticleVotes } from "../../api";
import "../../styles/comments.css";
import { getUsers } from "../../api";
import CommentsForm from "../Comments/CommentsForm";
import Comments from "../Comments/Comments";

export default function ArticleDetail({ activeUser }) {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false); // New state to track if the user has voted

  useEffect(() => {
    setIsLoading(true);

    fetchArticles(article_id)
      .then((data) => {
        setArticle(data);
        return fetchComments(article_id);
      })
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [article_id]);

  const addComment = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const removeComment = (commentId) =>
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );

  const handleVote = (inc_votes) => {
    const newVotes = article.votes + inc_votes;
    setArticle({ ...article, votes: newVotes });
    updateArticleVotes(article_id, inc_votes)
      .then(() => {
        setHasVoted(true); // Set the state to indicate the user has voted
      })
      .catch((error) => {
        setArticle({ ...article, votes: article.votes - inc_votes });
      });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} />
      <p className="article-body">{article.body}</p>
      <p className="article-votes">
        Total Votes: <span className="votes-number">{article.votes}</span>
      </p>
      <div className="up-vote">
        <button
          className="like-button"
          onClick={() => handleVote(1)}
          disabled={hasVoted} // Disable button if user has voted
        >
          Like
        </button>
        <button
          className="dislike-button"
          onClick={() => handleVote(-1)}
          disabled={hasVoted} // Disable button if user has voted
        >
          Dislike
        </button>
      </div>

      <p className="article-date">
        Created on {new Date(article.created_at).toLocaleDateString()}
      </p>
      <h2>Comments</h2>
      <Comments
        comments={comments}
        removeComment={removeComment}
        currentUser={activeUser}
      />
      <CommentsForm
        article_id={article_id}
        activeUser={activeUser}
        addComment={addComment}
      />
    </div>
  );
}
