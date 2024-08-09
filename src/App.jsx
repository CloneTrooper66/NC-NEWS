import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import TopicsList from "./components/Topics/TopicsList";
import Articles from "./components/Articles/Articles";
import ArticleDetail from "./components/Articles/ArticleDetail";
import Users from "./components/Users/Users";
import { useEffect, useState } from "react";
import Starting from "./components/StartingPage/Starting";

function App() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleUserSelect = (selectedUsername) => {
    setUsername(selectedUsername);
    localStorage.setItem("username", selectedUsername);
  };

  const handleLogout = () => {
    setUsername("");
    localStorage.removeItem("username");
  };

  return (
    <>
      <Nav user={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Starting />}></Route>
        <Route path="/coding" element={<TopicsList topic="coding" />}></Route>
        <Route path="/cooking" element={<TopicsList topic="cooking" />}></Route>
        <Route
          path="/football"
          element={<TopicsList topic="football" />}
        ></Route>
        <Route path="/topics" element={<Home />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/articles/:article_id" element={<ArticleDetail />} />
        <Route
          path="/login"
          element={<Users onSelectUser={handleUserSelect} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
