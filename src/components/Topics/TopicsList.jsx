import { fetchArticles } from "../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/TopicsList.css";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function TopicsList({ topic }) {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setArticles(
          data.filter((object) => {
            return object.topic === topic;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, [topic]);

  return (
    <>
      <ImageList sx={{ width: "100%", height: "100%" }}>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader
            component="div"
            style={{ textAlign: "center", fontSize: 32 }}
          >
            {topic[0].toUpperCase() + topic.slice(1)}
          </ListSubheader>
        </ImageListItem>
        {articles.map((item) => (
          <ImageListItem key={item.article_id}>
            <img
              srcSet={`${item.article_img_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.article_img_url}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
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
