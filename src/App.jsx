import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import TopicsList from "./components/Topics/TopicsList";
import Articles from "./components/Articles/Articles";
import ArticleDetail from "./components/Articles/ArticleDetail";
import Users from "./components/Users/Users";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/coding" element={<TopicsList topic="coding" />}></Route>
        <Route path="/cooking" element={<TopicsList topic="cooking" />}></Route>
        <Route
          path="/football"
          element={<TopicsList topic="football" />}
        ></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/articles/:article_id" element={<ArticleDetail />} />
        <Route path="/login" element={<Users />}></Route>
      </Routes>
    </>
  );
}

export default App;
