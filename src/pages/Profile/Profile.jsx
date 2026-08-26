import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

function Profile() {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h2>You're not logged in</h2>

          <Link to="/login">
            Log in
          </Link>
        </div>
      </div>
    );
  }

  const initial =
    user.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-heading">
          <span className="profile-label">
            TRAVORA ACCOUNT
          </span>

          <h1>Your Profile</h1>

          <p>
            Manage your Travora account information.
          </p>
        </div>

        <div className="profile-user">

          <div className="profile-avatar">
            {initial}
          </div>

          <div>
            <h2>{user.name}</h2>

            <p>{user.email}</p>
          </div>

        </div>

        <div className="profile-details">

          <div className="profile-detail">
            <span>Name</span>
            <strong>{user.name}</strong>
          </div>

          <div className="profile-detail">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          {user.role && (
            <div className="profile-detail">
              <span>Account type</span>
              <strong>
                {user.role}
              </strong>
            </div>
          )}

        </div>

        <Link
          to="/"
          className="profile-home-btn"
        >
          Continue exploring
        </Link>

      </div>

    </div>
  );
}

export default Profile;