import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Customer',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    // Here, you can implement functionality to edit user profile info (e.g., open an edit form)
    alert('Edit Profile Clicked');
  };

  const handleLogout = () => {
    // Implement logout logic (e.g., clear session, navigate to login page)
    alert('Logged out');
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={profileImage || 'https://via.placeholder.com/120'} // Placeholder image if no profile picture is uploaded
          alt="Profile"
        />
        <h2>{userInfo.name}</h2>
      </div>

      <div className="profile-section">
        <h3>Profile Info</h3>
        <div className="profile-info">
          <div>
            <span>Email:</span>
            <span>{userInfo.email}</span>
          </div>
          <div>
            <span>Role:</span>
            <span>{userInfo.role}</span>
          </div>
        </div>
      </div>

      <div className="upload-photo">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleEditProfile}>Upload Photo</button>
      </div>

      <div className="edit-button">
        <button onClick={handleEditProfile}>Edit Profile</button>
      </div>

      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
