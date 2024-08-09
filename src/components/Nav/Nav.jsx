import React, { useEffect, useState } from "react";
import "../../styles/Nav.css";
import { Link } from "react-router-dom";
import { getUsers } from "../../api";

export default function Nav({ user, onLogout }) {
  const [userImage, setUserImage] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().then((data) => {
      const correctUser = data.find((userData) => userData.username === user);
      if (correctUser) {
        setUserImage(correctUser.avatar_url);
      }
    });
  }, [user]);

  function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  }

  function hideSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  }

  function handleLogout() {
    onLogout();
    setShowLogoutModal(false);
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
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          {user ? ( // If user is logged in
            <li onClick={() => setShowLogoutModal(true)}>
              <img src={userImage} alt="Profile" className="profile-picture" />
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
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
          <li className="hideOnMobile">
            <Link to="/topics">Topics</Link>
          </li>
          {user ? ( // If user is logged in
            <li onClick={() => setShowLogoutModal(true)}>
              <img src={userImage} alt="Profile" className="profile-picture" />
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
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
      {showLogoutModal && ( // Logout confirmation modal
        <div className="logout-modal">
          <p>Are you sure you want to log out?</p>
          <button onClick={handleLogout}>Yes</button>
          <button onClick={() => setShowLogoutModal(false)}>No</button>
        </div>
      )}
    </>
  );
}
