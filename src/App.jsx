import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import TopicsList from "./components/Topics/TopicsList";

function App() {
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
      </Routes>
    </>
  );
}

export default App;
