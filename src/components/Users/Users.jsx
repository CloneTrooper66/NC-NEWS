import React, { useEffect, useState } from "react";
import { getUsers } from "../../api";
import Loading from "../LoadingScreen/Loading";
import "../../styles/Users.css";
import { Link } from "react-router-dom";

export default function Users({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  }, []);

  const handleLogin = (user) => {
    setSelectedUser(user);
    onSelectUser(user.username);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h1 className="usersH1">Please select a user</h1>
      <div className="users-wrapper">
        <div className="users-container">
          {users.map((user) => (
            <div
              key={user.username}
              className={`user-card ${selectedUser === user ? "selected" : ""}`}
              onClick={() => handleLogin(user)}
            >
              <div className="user-avatar">
                <img src={user.avatar_url} alt="User Profile" />
              </div>
              <div className="user-info">
                <p className="username">{user.username}</p>
                <p className="name">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedUser ? (
          <>
            <Link to="/topics">
              <p className="userDescription">Explore the topics</p>
            </Link>
            <p>Logged in as: {selectedUser.username}</p>
          </>
        ) : null}
      </div>
    </>
  );
}
