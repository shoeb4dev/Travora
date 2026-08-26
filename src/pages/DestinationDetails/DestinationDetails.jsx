import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getCountryById,
  getCities,
} from "../../api";

import "./DestinationDetails.css";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [cities, setCities] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setLoading(true);
        setError("");

        const [countryData, citiesData] =
          await Promise.all([
            getCountryById(id),
            getCities(),
          ]);

        const countryResult =
          countryData?.country || countryData;

        const allCities =
          citiesData?.cities || citiesData || [];

        setCountry(countryResult);

        const countryCities = allCities.filter(
          (city) => {
            const cityCountry =
              city.country?._id ||
              city.country;

            return (
              String(cityCountry) === String(id)
            );
          }
        );

        setCities(countryCities);
      } catch (err) {
        console.error(
          "Failed to load destination:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load this destination."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDestination();
    }
  }, [id]);

  const filteredCities = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return cities;
    }

    return cities.filter((city) =>
      `${city.name} ${city.description}`
        .toLowerCase()
        .includes(query)
    );
  }, [cities, search]);

  const handleCityClick = (cityId) => {
    navigate(`/cities/${cityId}`);
  };

  if (loading) {
    return (
      <main className="destination-details-page">
        <div className="destination-details-state">
          <div className="loading-spinner"></div>

          <p>
            Discovering {country?.name || "destination"}...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="destination-details-page">
        <div className="destination-details-state error-state">
          <span>!</span>

          <h2>
            Something went wrong
          </h2>

          <p>{error}</p>

          <button
            onClick={() =>
              navigate("/destinations")
            }
          >
            Back to destinations
          </button>
        </div>
      </main>
    );
  }

  if (!country) {
    return (
      <main className="destination-details-page">
        <div className="destination-details-state">
          <h2>
            Destination not found
          </h2>

          <button
            onClick={() =>
              navigate("/destinations")
            }
          >
            Back to destinations
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="destination-details-page">

      {/* HERO */}

      <section className="destination-details-hero">

        <img
          src={country.image}
          alt={country.name}
        />

        <div className="destination-details-overlay"></div>

        <div className="destination-details-hero-content">

          <button
            className="back-button"
            onClick={() =>
              navigate("/destinations")
            }
          >
            ← Back to destinations
          </button>

          <span>
            EXPLORE
          </span>

          <h1>
            {country.name}
          </h1>

          <p>
            {country.description}
          </p>

        </div>

      </section>

      {/* CITIES */}

      <section className="destination-cities">

        <div className="destination-cities-heading">

          <div>
            <span>
              {cities.length}{" "}
              {cities.length === 1
                ? "CITY"
                : "CITIES"}
            </span>

            <h2>
              Explore {country.name}
            </h2>

            <p>
              Discover cities and experiences
              worth adding to your journey.
            </p>
          </div>

          <div className="city-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search cities..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}

          </div>

        </div>

        {/* EMPTY */}

        {filteredCities.length === 0 && (
          <div className="destination-details-state">

            <span>⌕</span>

            <h3>
              No cities found
            </h3>

            <p>
              There are currently no cities
              matching your search.
            </p>

            {search && (
              <button
                onClick={() =>
                  setSearch("")
                }
              >
                Clear search
              </button>
            )}

          </div>
        )}

        {/* CITY GRID */}

        {filteredCities.length > 0 && (
          <div className="cities-grid">

            {filteredCities.map((city) => (
              <article
                key={city._id}
                className="city-card"
                onClick={() =>
                  handleCityClick(city._id)
                }
              >

                <div className="city-card-image">

                  <img
                    src={city.image}
                    alt={city.name}
                    loading="lazy"
                  />

                  <div className="city-card-overlay"></div>

                  <div className="city-card-content">

                    <span>
                      CITY
                    </span>

                    <h3>
                      {city.name}
                    </h3>

                  </div>

                </div>

                <div className="city-card-description">

                  <p>
                    {city.description}
                  </p>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();

                      handleCityClick(
                        city._id
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

export default DestinationDetails;