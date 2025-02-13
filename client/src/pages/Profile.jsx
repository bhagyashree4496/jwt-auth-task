import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/profile.css"; // Import external CSS

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="profile-message">No user logged in</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <p className="profile-info">
        <strong>Name:</strong> {user.name}
      </p>
      <p className="profile-info">
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}

export default Profile;
