"use client";
import React, { useEffect, useState } from "react";

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [movieTitle, setMovieTitle] = useState("Movie Title");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy function to simulate fetching movie details
  const fetchPopularMovies = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{  VideoUrl: "path_to_your_video.mp4" }]);
      }, 1000);
    });
  };

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const movies = await fetchPopularMovies();

        if (movies.length > 0) {
          const firstMovie = movies[0];
          setMovieTitle(firstMovie.Title);
          setVideoUrl(firstMovie.VideoUrl);
        } else {
          throw new Error("No movies found");
        }
      } catch (error) {
        console.error("Failed to load movie data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, []);

  if (loading) {
    return <div className="text-gray-500 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className=" w-full max-w-7xl mx-auto">
      <h2 className="text-center text-white text-2xl mb-4">{movieTitle}</h2>
      {videoUrl ? (
        <div className="relative">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-auto rounded-lg"
          />
          
        </div>
      ) : (
        <p className="text-gray-500 text-center">No video available</p>
      )}
    </div>
  );
};

export default VideoPlayer;
