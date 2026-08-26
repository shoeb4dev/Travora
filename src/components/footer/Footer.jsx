import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">✦</span>
            Travora
          </Link>

          <p>
            Discover beautiful places, unforgettable experiences,
            and stories worth travelling for.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <Link to="/destinations">Destinations</Link>
            <a href="#explore">Attractions</a>
            <a href="#explore">Travel Reels</a>
          </div>

          <div>
            <h4>Travora</h4>
            <a href="#about">About Us</a>
            <a href="#about">Contact</a>
            <a href="#about">Privacy</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Travora. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;