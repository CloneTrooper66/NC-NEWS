import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Explore Your Interests in Coding, Cooking, and Football</h1>
        <p>Dive into the world of technology, culinary arts, and sports.</p>
        <Link to="/coding">
          <button>Learn Coding</button>
        </Link>
        <Link to="/cooking">
          <button>Explore Recipes</button>
        </Link>
        <Link to="/football">
          <button>Football Insights</button>
        </Link>
      </section>
    </div>
  );
}
