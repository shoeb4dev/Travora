import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getCountries,
  getCities,
} from "../../api";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [countries, setCountries] =
    useState([]);

  const [cities, setCities] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadHomeData =
      async () => {
        try {
          setLoading(true);

          const [
            countryData,
            cityData,
          ] = await Promise.all([
            getCountries(),
            getCities(),
          ]);

          setCountries(
            countryData || []
          );

          setCities(
            cityData || []
          );
        } catch (err) {
          console.error(
            "Home data error:",
            err
          );

          setError(
            "Unable to load destinations."
          );
        } finally {
          setLoading(false);
        }
      };

    loadHomeData();
  }, []);

  return (
    <main className="home-page">

      {/* ======================
          HERO
      ====================== */}

      <section className="home-hero">

        <div className="home-hero-content">

          <span>
            TRAVEL DIFFERENTLY
          </span>

          <h1>
            Every journey
            <br />
            tells a story.
          </h1>

          <p>
            Discover extraordinary
            places, unforgettable
            experiences and stories
            worth travelling for.
          </p>

          <button
            onClick={() =>
              document
                .getElementById(
                  "explore"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Explore the world →
          </button>

        </div>

      </section>

      {/* ======================
          EXPLORE
      ====================== */}

      <section
        id="explore"
        className="home-explore"
      >

        <div className="home-section-heading">

          <div>
            <span>
              DESTINATIONS
            </span>

            <h2>
              Where will you go?
            </h2>
          </div>

          <button
            onClick={() =>
              navigate(
                "/destinations"
              )
            }
          >
            View all →
          </button>

        </div>

        {loading ? (
          <div className="home-state">
            Loading destinations...
          </div>
        ) : error ? (
          <div className="home-state">
            {error}
          </div>
        ) : (
          <div className="country-grid">

            {countries.map(
              (country) => (
                <article
                  className="home-country-card"
                  key={country._id}
                  onClick={() =>
                    navigate(
                      `/destinations/${country._id}`
                    )
                  }
                >

                  <img
                    src={country.image}
                    alt={country.name}
                    loading="lazy"
                  />

                  <div className="country-card-overlay"></div>

                  <div className="country-card-content">

                    <span>
                      {country.code ||
                        "DESTINATION"}
                    </span>

                    <h3>
                      {country.name}
                    </h3>

                    <p>
                      Explore →
                    </p>

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </section>

      {/* ======================
          CITIES
      ====================== */}

      <section className="home-cities">

        <div className="home-section-heading">

          <div>
            <span>
              CITY GUIDES
            </span>

            <h2>
              Explore remarkable cities
            </h2>
          </div>

        </div>

        {loading ? (
          <div className="home-state">
            Loading cities...
          </div>
        ) : (
          <div className="city-grid">

            {cities.map(
              (city) => (
                <article
                  className="home-city-card"
                  key={city._id}
                  onClick={() =>
                    navigate(
                      `/cities/${city._id}`
                    )
                  }
                >

                  <div className="home-city-image">

                    <img
                      src={city.image}
                      alt={city.name}
                      loading="lazy"
                    />

                  </div>

                  <div className="home-city-content">

                    <h3>
                      {city.name}
                    </h3>

                    <p>
                      {
                        city.description
                      }
                    </p>

                    <button>
                      Discover city →
                    </button>

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </section>

      {/* ======================
          ABOUT
      ====================== */}

      <section
        id="about"
        className="home-about"
      >

        <span>
          ABOUT TRAVORA
        </span>

        <h2>
          Travel is better
          <br />
          when you know the story.
        </h2>

        <p>
          Travora helps you discover
          destinations through places,
          people, stories, audio and
          short travel videos.
        </p>

      </section>

    </main>
  );
}

export default Home;