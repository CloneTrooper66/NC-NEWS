import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Loading from "../LoadingScreen/Loading";
import { Link } from "react-router-dom";
export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1 style={{ textAlign: "center", margin: 20 }}>Articles</h1>
      <ImageList sx={{ width: "100%", height: "100%" }}>
        <ImageListItem key="Subheader" cols={2}></ImageListItem>
        {articles.map((item) => (
          <ImageListItem key={item.article_id}>
            <img
              srcSet={`${item.article_img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.article_img_url}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={
                <Link
                  to={`/articles/${item.article_id}`}
                  style={{ color: "#4169E1" }}
                >
                  {item.title}
                </Link>
              }
              subtitle={
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>
                    Created on {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <span>By {item.author}</span>
                </div>
              }
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
