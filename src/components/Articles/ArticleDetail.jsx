import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../LoadingScreen/Loading";
import { fetchArticles } from "../../api";

export default function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(article_id)
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [article_id]);

  return isLoading ? <Loading /> : <h1>{article.title}</h1>;
}
