import {
  NavLink,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleExploreClick = (event) => {
    event.preventDefault();

    closeMenu();

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById("explore")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 150);
    } else {
      document
        .getElementById("explore")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-icon">✦</span>
          <span className="logo-text">Travora</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/destinations"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Destinations
          </NavLink>

          <a
            href="/#explore"
            className="nav-link"
            onClick={handleExploreClick}
          >
            Explore
          </a>

          {/* NEW REELS */}
          <NavLink
            to="/reels"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Reels
          </NavLink>

          <a
            href="/#about"
            className="nav-link"
            onClick={(event) => {
              event.preventDefault();

              closeMenu();

              if (location.pathname !== "/") {
                navigate("/");

                setTimeout(() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 150);
              } else {
                document
                  .getElementById("about")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }
            }}
          >
            About
          </a>

        </nav>

        {/* Desktop Actions */}
        <div className="navbar-actions">

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>

          <button
            className="explore-btn"
            onClick={handleExploreClick}
          >
            Start Exploring
          </button>

        </div>

        {/* Mobile Button */}
        <button
          className={`menu-btn ${
            menuOpen ? "open" : ""
          }`}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* Mobile Navigation */}
      <div
        className={`mobile-nav ${
          menuOpen ? "show" : ""
        }`}
      >

        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "mobile-nav-link active"
              : "mobile-nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/destinations"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "mobile-nav-link active"
              : "mobile-nav-link"
          }
        >
          Destinations
        </NavLink>

        <a
          href="/#explore"
          onClick={handleExploreClick}
          className="mobile-nav-link"
        >
          Explore
        </a>

        {/* NEW REELS */}
        <NavLink
          to="/reels"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "mobile-nav-link active"
              : "mobile-nav-link"
          }
        >
          Reels
        </NavLink>

        <a
          href="/#about"
          onClick={(event) => {
            event.preventDefault();

            closeMenu();

            if (location.pathname !== "/") {
              navigate("/");

              setTimeout(() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }, 150);
            } else {
              document
                .getElementById("about")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }
          }}
          className="mobile-nav-link"
        >
          About
        </a>

        <button
          className="mobile-start-btn"
          onClick={handleExploreClick}
        >
          Start Exploring
        </button>

      </div>
    </header>
  );
}

export default Navbar;