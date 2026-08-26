import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getAttractionById,
  getReelsByAttraction,
  getAudioStories,
} from "../../api";

import "./AttractionDetails.css";

function AttractionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [attraction, setAttraction] =
    useState(null);

  const [reels, setReels] =
    useState([]);

  const [audioStories, setAudioStories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const attractionData =
          await getAttractionById(id);

        setAttraction(
          attractionData
        );

        const reelData =
          await getReelsByAttraction(id);

        setReels(reelData || []);

        const stories =
          await getAudioStories();

        const filteredStories =
          stories.filter(
            (story) =>
              story.attraction === id ||
              story.attraction?._id === id
          );

        setAudioStories(
          filteredStories
        );
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Unable to load attraction."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <main className="attraction-details-page">
        <div className="attraction-details-state">
          Loading attraction...
        </div>
      </main>
    );
  }

  if (error || !attraction) {
    return (
      <main className="attraction-details-page">
        <div className="attraction-details-state">
          <h2>
            Attraction unavailable
          </h2>

          <p>{error}</p>

          <button
            onClick={() =>
              navigate(-1)
            }
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="attraction-details-page">

      <section className="attraction-detail-hero">

        <img
          src={attraction.image}
          alt={attraction.name}
        />

        <div className="attraction-detail-overlay"></div>

        <div className="attraction-detail-content">

          <button
            onClick={() =>
              navigate(-1)
            }
          >
            ← Back
          </button>

          <span>
            {attraction.category}
          </span>

          <h1>
            {attraction.name}
          </h1>

          <p>
            {attraction.description}
          </p>

        </div>

      </section>

      <section className="attraction-detail-body">

        {/* AUDIO */}

        {audioStories.length > 0 && (
          <section className="story-section">

            <span>
              LISTEN
            </span>

            <h2>
              Stories of this place
            </h2>

            {audioStories.map(
              (story) => (
                <div
                  className="audio-story"
                  key={story._id}
                >

                  <div>
                    <h3>
                      {story.title}
                    </h3>

                    <p>
                      {
                        story.description
                      }
                    </p>

                    <small>
                      {story.language}
                    </small>
                  </div>

                  <audio
                    controls
                    src={
                      story.audioUrl
                    }
                  />

                </div>
              )
            )}

          </section>
        )}

        {/* REELS */}

        <section className="reel-section">

          <div className="section-title">
            <span>
              WATCH
            </span>

            <h2>
              Experience it through Reels
            </h2>
          </div>

          {reels.length === 0 ? (
            <p>
              No reels available yet.
            </p>
          ) : (
            <div className="detail-reels">

              {reels.map(
                (reel) => (
                  <div
                    className="detail-reel"
                    key={reel._id}
                  >

                    <video
                      src={
                        reel.videoUrl
                      }
                      controls
                      playsInline
                    />

                    <h3>
                      {reel.title}
                    </h3>

                    <p>
                      {
                        reel.description
                      }
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </section>

      </section>

    </main>
  );
}

export default AttractionDetails;