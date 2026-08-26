import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCountries } from "../../api";

import "./Destinations.css";

function Destinations() {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCountries();

        setCountries(data || []);
      } catch (err) {
        console.error(
          "Failed to load countries:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load destinations."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return countries;
    }

    return countries.filter((country) =>
      `${country.name} ${country.description}`
        .toLowerCase()
        .includes(query)
    );
  }, [countries, search]);

  const handleCountryClick = (countryId) => {
    navigate(`/destinations/${countryId}`);
  };

  return (
    <main className="destinations-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="destinations-hero">

        <div className="destinations-hero-content">

          <span className="destinations-label">
            EXPLORE THE WORLD
          </span>

          <h1>
            Find somewhere
            <br />
            <span>worth going.</span>
          </h1>

          <p>
            Discover countries, cities and experiences
            worth adding to your next journey.
          </p>

        </div>

      </section>

      {/* =========================
          SEARCH
      ========================= */}

      <section className="destinations-controls">

        <div className="destination-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>

      </section>

      {/* =========================
          RESULTS
      ========================= */}

      <section className="destinations-results">

        <div className="results-heading">

          <div>

            <span>
              {filteredCountries.length} countries
            </span>

            <h2>
              Discover your next escape
            </h2>

          </div>

        </div>

        {/* Loading */}

        {loading && (
          <div className="destinations-state">

            <div className="loading-spinner"></div>

            <p>
              Discovering destinations...
            </p>

          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="destinations-state error-state">

            <span>!</span>

            <h3>
              Something went wrong
            </h3>

            <p>
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
            >
              Try again
            </button>

          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          filteredCountries.length === 0 && (
            <div className="destinations-state">

              <span>⌕</span>

              <h3>
                No countries found
              </h3>

              <p>
                Try searching for another country.
              </p>

              <button
                onClick={() => setSearch("")}
              >
                Clear search
              </button>

            </div>
          )}

        {/* Countries */}

        {!loading &&
          !error &&
          filteredCountries.length > 0 && (

            <div className="destinations-grid">

              {filteredCountries.map((country) => (

                <article
                  key={country._id}
                  className="destination-card"
                  onClick={() =>
                    handleCountryClick(country._id)
                  }
                >

                  <div className="destination-card-image">

                    <img
                      src={country.image}
                      alt={country.name}
                      loading="lazy"
                    />

                    <div className="destination-card-overlay"></div>

                    <div className="destination-card-content">

                      <span>
                        DESTINATION
                      </span>

                      <h3>
                        {country.name}
                      </h3>

                    </div>

                  </div>

                  <div className="destination-card-description">

                    <p>
                      {country.description}
                    </p>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();

                        handleCountryClick(
                          country._id
                        );
                      }}
                    >
                      Explore
                      <strong>↗</strong>
                    </button>

                  </div>

                </article>

              ))}

            </div>
          )}

      </section>

    </main>
  );
}

export default Destinations;