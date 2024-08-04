import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/coding"></Route>
        <Route path="/recipes"></Route>
        <Route path="/football"></Route>
      </Routes>
    </>
  );
}

export default App;
