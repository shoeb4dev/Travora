import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ExploreSearch.css";

function ExploreSearch() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("destinations");


const handleSearch = (event) => {
  event.preventDefault();

  const query = search.trim();

  if (!query) {
    return;
  }

  const routes = {
    destinations: "/destinations",
    cities: "/cities",
    attractions: "/attractions",
    experiences: "/experiences",
  };

  const route = routes[type] || "/destinations";

  navigate(`${route}?search=${encodeURIComponent(query)}`);
};


//   const handleSearch = (event) => {
//     event.preventDefault();

//     const query = search.trim();

//     if (!query) {
//       return;
//     }

//     navigate(`/destinations?search=${encodeURIComponent(query)}`);
//   };



  return (
    <section className="explore-search-section" id="explore">

      <div className="explore-search-container">

        {/* Heading */}
        <div className="explore-heading">

          <span className="explore-label">
            WHERE WILL YOU GO?
          </span>

          <h2>
            Find a place
            <br />
            <span>you'll love.</span>
          </h2>

          <p>
            Search destinations, cities and experiences
            that match the way you want to travel.
          </p>

        </div>

        {/* Search box */}
        <form
          className="explore-search-box"
          onSubmit={handleSearch}
        >

          <div className="search-input-area">

            <div className="search-icon">
              ⌕
            </div>

            <div className="search-input-wrapper">

              <label htmlFor="destination-search">
                Search destination
              </label>

              <input
                id="destination-search"
                type="text"
                placeholder="Where do you want to go?"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

            </div>

          </div>

          <div className="search-divider"></div>

          <div className="search-type-area">

            <label htmlFor="search-type">
              Explore
            </label>

            <select
              id="search-type"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="destinations">
                Destinations
              </option>

              <option value="cities">
                Cities
              </option>

              <option value="attractions">
                Attractions
              </option>

              <option value="experiences">
                Experiences
              </option>
            </select>

          </div>

          <button
            type="submit"
            className="search-submit"
          >
            <span>Search</span>
            <strong>↗</strong>
          </button>

        </form>

        {/* Popular searches */}
        <div className="popular-searches">

          <span>Popular:</span>

          <button
            onClick={() => setSearch("Goa")}
          >
            Goa
          </button>

          <button
            onClick={() => setSearch("Dubai")}
          >
            Dubai
          </button>

          <button
            onClick={() => setSearch("Bali")}
          >
            Bali
          </button>

          <button
            onClick={() => setSearch("Paris")}
          >
            Paris
          </button>

          <button
            onClick={() => setSearch("Maldives")}
          >
            Maldives
          </button>

        </div>

      </div>

    </section>
  );
}

export default ExploreSearch;