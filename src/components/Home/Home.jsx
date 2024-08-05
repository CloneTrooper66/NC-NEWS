import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.css";
export default function () {
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
      {/* ----------------------------------------------------
| Logo               | Home About Contact          |
----------------------------------------------------
|                HERO SECTION                       |
|    [Main Heading: Explore Your Interests]         |
|    [Subheading: Dive into the world...]           |
|    [Learn Coding]  [Explore Recipes]  [Football]  |
----------------------------------------------------
|  CODING       |  COOKING      |  FOOTBALL        |
|  Intro Text   |  Intro Text   |  Intro Text      |
|  Image        |  Image        |  Image           |
|  [Explore]    |  [Explore]    |  [Explore]       |
----------------------------------------------------
| Quick Links   | Contact Info  | Newsletter Signup|
| Coding Link   | Email         | [Email Field]    |
| Cooking Link  | Phone         | [Subscribe]      |
| Football Link | Social Icons  |                  |
---------------------------------------------------- */}
    </div>
  );
}
