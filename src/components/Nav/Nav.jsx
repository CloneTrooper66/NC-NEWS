import React from "react";
import "../../styles/Nav.css";
import { Link } from "react-router-dom";
import Home from "../Home/Home";
export default function Nav() {
  function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  }

  function hideSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  }

  return (
    <>
      <nav>
        <ul className="sidebar">
          <li onClick={hideSidebar}>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26px"
                viewBox="0 -960 960 960"
                width="26px"
                fill="#5f6368"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </a>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#">Articles</a>
          </li>
          {/* <li>
            <a href="#">Topics</a>
          </li> */}
          <li>
            <a href="#">Login</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href="#">NC NEWS</a>
          </li>
          <li className="hideOnMobile">
            <Link to="/">Home</Link>
          </li>
          <li className="hideOnMobile">
            <Link to="/articles">Articles</Link>
          </li>
          {/* <li className="hideOnMobile">
            <a href="#">Topics</a>
          </li> */}
          <li className="hideOnMobile">
            <a href="#">Login</a>
          </li>
          <li className="menu-button" onClick={showSidebar}>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26px"
                viewBox="0 -960 960 960"
                width="26px"
                fill="#5f6368"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
