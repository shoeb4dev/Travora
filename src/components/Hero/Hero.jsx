import { Link } from "react-router-dom";

import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* Background decoration */}
      <div className="hero-orb hero-orb-one"></div>
      <div className="hero-orb hero-orb-two"></div>

      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Discover your next escape
          </div>

          <h1>
            Travel far.
            <br />
            <span>Feel more.</span>
          </h1>

          <p className="hero-description">
            Discover remarkable destinations, hidden places and
            unforgettable experiences — all in one beautiful journey.
          </p>

          <div className="hero-actions">

            <Link
              to="/destinations"
              className="hero-primary-button"
            >
              Explore destinations
              <span>↗</span>
            </Link>

            <button className="hero-play-button">
              <span className="play-icon">▶</span>
              <span>Discover Travora</span>
            </button>

          </div>

          {/* Small stats */}
          <div className="hero-stats">

            <div className="hero-stat">
              <strong>120+</strong>
              <span>Destinations</span>
            </div>

            <div className="stat-divider"></div>

            <div className="hero-stat">
              <strong>500+</strong>
              <span>Experiences</span>
            </div>

            <div className="stat-divider"></div>

            <div className="hero-stat">
              <strong>50K+</strong>
              <span>Travellers</span>
            </div>

          </div>

        </div>

        {/* RIGHT VISUAL */}
        <div className="hero-visual">

          <div className="hero-image-wrapper">

            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
              alt="Beautiful tropical destination"
              className="hero-image"
            />

            <div className="hero-image-overlay"></div>

            {/* Location card */}
            <div className="hero-location-card">

              <div className="location-icon">
                📍
              </div>

              <div>
                <span>Featured destination</span>
                <strong>Maldives</strong>
              </div>

              <span className="location-arrow">↗</span>

            </div>

          </div>

          {/* Floating card */}
          <div className="hero-floating-card">

            <div className="floating-card-image">
              <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=200&q=80"
                alt="India destination"
              />
            </div>

            <div className="floating-card-content">
              <span>Trending now</span>
              <strong>India</strong>

              <div className="rating">
                <span>★</span>
                <span>4.9</span>
              </div>
            </div>

          </div>

          {/* Decorative circle */}
          <div className="hero-circle">
            <span>TRAVEL</span>
            <span>EXPLORE</span>
            <span>REPEAT</span>
          </div>

        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span>Scroll to explore</span>
        <div className="scroll-line"></div>
      </div>

    </section>
  );
}

export default Hero;