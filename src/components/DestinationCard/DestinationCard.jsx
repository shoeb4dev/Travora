import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./DestinationCard.css";

function DestinationCard({ destination }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleOpenDestination = () => {
    navigate(`/destinations/${destination.id}`);
  };

  return (
    <article className="destination-card">

      <div
        className="destination-card-image"
        onClick={handleOpenDestination}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleOpenDestination();
          }
        }}
      >

        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
        />

        <div className="destination-card-overlay"></div>

        <button
          className={`save-button ${saved ? "saved" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            setSaved(!saved);
          }}
          aria-label={`Save ${destination.name}`}
        >
          {saved ? "♥" : "♡"}
        </button>

        {destination.popular && (
          <span className="popular-badge">
            Popular
          </span>
        )}

        <div className="destination-rating">
          <span>★</span>
          {destination.rating}
        </div>

      </div>

      <div className="destination-card-content">

        <div>
          <span className="destination-category">
            {destination.category}
          </span>

          <h3>{destination.name}</h3>

          <p>
            📍 {destination.country}
          </p>
        </div>

        <button
          className="destination-view-button"
          onClick={handleOpenDestination}
          aria-label={`View ${destination.name}`}
        >
          ↗
        </button>

      </div>

      <p className="destination-description">
        {destination.description}
      </p>

    </article>
  );
}

export default DestinationCard;