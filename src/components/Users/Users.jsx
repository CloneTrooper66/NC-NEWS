import React, { useEffect, useState } from "react";
import { getUsers } from "../../api";
import Loading from "../LoadingScreen/Loading";
import "../../styles/Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const confirmSelection = () => {
    if (selectedUser) {
      alert(`You have selected ${selectedUser.username}`);
      // Perform any additional actions on selection confirmation
    } else {
      alert("Please select a user first.");
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="users-wrapper">
      <div className="users-container">
        {users.map((user) => (
          <div
            key={user.username}
            className={`user-card ${selectedUser === user ? "selected" : ""}`}
            onClick={() => handleUserSelect(user)}
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
      <button className="confirm-button" onClick={confirmSelection}>
        Confirm Selection
      </button>
    </div>
  );
}
