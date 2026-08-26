import { Link } from "react-router-dom";

import "./FeaturedDestinations.css";

const destinations = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=85",
    tag: "Mediterranean escape",
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    tag: "Island adventure",
  },
  {
    id: 3,
    name: "Swiss Alps",
    country: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85",
    tag: "Mountain escape",
  },
  {
    id: 4,
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
    tag: "Modern adventure",
  },
];

function FeaturedDestinations() {
  return (
    <section className="featured-section">

      <div className="featured-container">

        {/* Heading */}
        <div className="featured-heading">

          <div>
            <span className="section-label">
              WANDER WITH TRAVORA
            </span>

            <h2>
              Places worth
              <br />
              <span>remembering.</span>
            </h2>
          </div>

          <Link
            to="/destinations"
            className="view-all-link"
          >
            View all destinations
            <span>↗</span>
          </Link>

        </div>

        {/* Cards */}
        <div className="destination-grid">

          {destinations.map((destination, index) => (
            <article
              className={`destination-card destination-card-${index + 1}`}
              key={destination.id}
            >

              <img
                src={destination.image}
                alt={destination.name}
              />

              <div className="destination-gradient"></div>

              <div className="destination-content">

                <span className="destination-tag">
                  {destination.tag}
                </span>

                <h3>{destination.name}</h3>

                <p>
                  <span>📍</span>
                  {destination.country}
                </p>

              </div>

              <button className="destination-arrow">
                ↗
              </button>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedDestinations;