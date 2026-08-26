import {
  useEffect,
  useState,
} from "react";

import {
  getReels,
  toggleLike,
  getReelLikes,
  getComments,
  addComment,
} from "../../api";

import "./Reels.css";

function Reels() {
  const [reels, setReels] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [likes, setLikes] =
    useState({});

  const [comments, setComments] =
    useState({});

  const [commentText, setCommentText] =
    useState({});

  useEffect(() => {
    const loadReels = async () => {
      try {
        const data =
          await getReels();

        setReels(data || []);

        const likeData = {};
        const commentData = {};

        for (const reel of data || []) {
          try {
            const result =
              await getReelLikes(
                reel._id
              );

            likeData[reel._id] =
              result.count ??
              result.likes ??
              0;
          } catch {
            likeData[reel._id] = 0;
          }

          try {
            const result =
              await getComments(
                reel._id
              );

            commentData[reel._id] =
              result || [];
          } catch {
            commentData[reel._id] = [];
          }
        }

        setLikes(likeData);
        setComments(commentData);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Unable to load reels."
        );
      } finally {
        setLoading(false);
      }
    };

    loadReels();
  }, []);

  const handleLike = async (reelId) => {
    try {
      const result =
        await toggleLike(reelId);

      setLikes((previous) => ({
        ...previous,
        [reelId]:
          result.message?.includes(
            "unliked"
          )
            ? Math.max(
                0,
                (previous[reelId] || 1) - 1
              )
            : (previous[reelId] || 0) + 1,
      }));
    } catch (err) {
      console.error(
        "Like failed:",
        err
      );
    }
  };

  const handleComment = async (
    reelId
  ) => {
    const text =
      commentText[reelId]?.trim();

    if (!text) return;

    try {
      const comment =
        await addComment(
          reelId,
          text
        );

      setComments((previous) => ({
        ...previous,
        [reelId]: [
          ...(previous[reelId] || []),
          comment,
        ],
      }));

      setCommentText((previous) => ({
        ...previous,
        [reelId]: "",
      }));
    } catch (err) {
      console.error(
        "Comment failed:",
        err
      );
    }
  };

  if (loading) {
    return (
      <main className="reels-page">
        <div className="reels-state">
          <div className="reel-spinner"></div>
          <p>
            Loading travel stories...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="reels-page">
        <div className="reels-state">
          <h2>
            Reels unavailable
          </h2>

          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="reels-page">

      <section className="reels-header">

        <span>
          TRAVEL STORIES
        </span>

        <h1>
          See the world
          <br />
          differently.
        </h1>

        <p>
          Explore places through
          the eyes of travellers.
        </p>

      </section>

      <section className="reels-feed">

        {reels.length === 0 ? (
          <div className="reels-state">
            <h2>
              No reels yet
            </h2>
          </div>
        ) : (
          reels.map((reel) => (
            <article
              className="reel-card"
              key={reel._id}
            >

              <div className="reel-video">

                <video
                  src={reel.videoUrl}
                  controls
                  loop
                  playsInline
                />

              </div>

              <div className="reel-info">

                <h2>
                  {reel.title}
                </h2>

                <p>
                  {reel.description}
                </p>

                <div className="reel-actions">

                  <button
                    onClick={() =>
                      handleLike(
                        reel._id
                      )
                    }
                  >
                    ♡{" "}
                    {likes[reel._id] || 0}
                  </button>

                  <span>
                    💬{" "}
                    {
                      comments[
                        reel._id
                      ]?.length || 0
                    }
                  </span>

                </div>

                <div className="comment-box">

                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={
                      commentText[
                        reel._id
                      ] || ""
                    }
                    onChange={(event) =>
                      setCommentText(
                        (previous) => ({
                          ...previous,
                          [reel._id]:
                            event.target
                              .value,
                        })
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      handleComment(
                        reel._id
                      )
                    }
                  >
                    Post
                  </button>

                </div>

                <div className="comments">

                  {comments[
                    reel._id
                  ]?.map((comment) => (
                    <div
                      className="comment"
                      key={comment._id}
                    >
                      <strong>
                        {comment.user?.name ||
                          "Traveller"}
                      </strong>

                      <p>
                        {comment.text}
                      </p>
                    </div>
                  ))}

                </div>

              </div>

            </article>
          ))
        )}

      </section>

    </main>
  );
}

export default Reels;