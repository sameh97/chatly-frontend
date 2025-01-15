import React from "react";
import "./Profile.scss";
import EditProfileForm from "./../profile/edit-profile/EditProfileForm"
const Profile = ({ user }) => {


  const createdAtDate = user.createdAt
  ? new Date(user.createdAt).toLocaleDateString()
  : "Invalid Date";

  const handleFormSubmit = (values) => {
    console.log(user);
    
    console.log("Updated user data:", values);
    // Call your API to update user data here
  };

  return (
<div className="container">
<div className="user-profile-container">
      <div className="profile-header">
        <img
          src={user.profilePicture}
          alt={`${user.username}'s profile`}
          className="profile-picture"
        />
        <h2>{user.username}</h2>
      </div>
      <div className="profile-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Account Created:</strong> {createdAtDate}</p>
      </div>
    </div>
    <div className="edit-container">
        <h1>Profile details</h1>
        <EditProfileForm user={user} onSubmit={handleFormSubmit} />
      </div>
</div>
  );
};

export default Profile;
