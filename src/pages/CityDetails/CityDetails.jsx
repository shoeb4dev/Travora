import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCityById,
  getAttractions,
} from "../../api";

import "./CityDetails.css";

function CityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [city, setCity] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCityData = async () => {
      try {
        setLoading(true);
        setError("");

        const cityData = await getCityById(id);

        const attractionsData = await getAttractions({
          city: id,
        });

        setCity(cityData);
        setAttractions(attractionsData || []);
      } catch (err) {
        console.error("City page error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load this city."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCityData();
  }, [id]);

  const filteredAttractions = attractions.filter(
    (attraction) => {
      const searchText = search.toLowerCase();

      return (
        attraction.name
          ?.toLowerCase()
          .includes(searchText) ||
        attraction.description
          ?.toLowerCase()
          .includes(searchText) ||
        attraction.category
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  if (loading) {
    return (
      <div className="city-page">
        <div className="city-status">
          <div className="city-loader"></div>

          <p>Loading city...</p>
        </div>
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="city-page">
        <div className="city-status">

          <h2>City not available</h2>

          <p>
            {error ||
              "We couldn't find this city."}
          </p>

          <button
            className="city-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="city-page">

      {/* HERO SECTION */}

      <section className="city-hero">

        <img
          src={
            city.image ||
            "https://images.unsplash.com/photo-1599661046289-e31897846e41"
          }
          alt={city.name}
          className="city-hero-image"
        />

        <div className="city-hero-overlay"></div>

        <div className="city-hero-content">

          <button
            className="city-back-btn hero-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <span className="city-label">
            EXPLORE CITY
          </span>

          <h1>{city.name}</h1>

          <p>
            {city.description ||
              "Discover unforgettable places, hidden gems and experiences in this beautiful city."}
          </p>

        </div>

      </section>


      {/* ATTRACTIONS SECTION */}

      <section className="city-attractions-section">

        <div className="city-section-header">

          <div>

            <span className="section-label">
              DISCOVER
            </span>

            <h2>
              Things to explore
            </h2>

            <p>
              Discover the best attractions
              and experiences in {city.name}.
            </p>

          </div>


          {/* SEARCH */}

          <div className="city-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search attractions..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

          </div>

        </div>


        {/* ATTRACTIONS */}

        {filteredAttractions.length === 0 ? (

          <div className="city-empty">

            <h3>
              No attractions found
            </h3>

            <p>
              Try searching for something else.
            </p>

          </div>

        ) : (

          <div className="city-attractions-grid">

            {filteredAttractions.map(
              (attraction) => (

                <article
                  className="city-attraction-card"
                  key={attraction._id}
                  onClick={() =>
                    navigate(
                      `/attractions/${attraction._id}`
                    )
                  }
                >

                  <div className="city-attraction-image">

                    <img
                      src={
                        attraction.image ||
                        "https://images.unsplash.com/photo-1518005020951-eccb494ad742"
                      }
                      alt={attraction.name}
                    />

                    {attraction.category && (
                      <span className="attraction-category">
                        {attraction.category}
                      </span>
                    )}

                  </div>


                  <div className="city-attraction-content">

                    <h3>
                      {attraction.name}
                    </h3>

                    <p>
                      {attraction.description ||
                        "Explore this amazing destination and discover its story."}
                    </p>

                    <button>
                      Explore
                      <span>→</span>
                    </button>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>

    </div>
  );
}

export default CityDetails;