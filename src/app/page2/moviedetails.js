"use client";
// components/MovieDetails.js
import React, { useEffect, useState } from "react";
import { fetchMovieDetails } from "../lib/fetchmovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faStar } from "@fortawesome/free-solid-svg-icons";

const MovieDetails = ({ title }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await fetchMovieDetails(title);
        setMovie(details);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [title]);

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="text-gray-500">No movie data available</div>;
  }

  // Destructure movie properties with fallback defaults
  const {
    Poster,
    Title = "Untitled",
    Genre = "N/A",
    Released = "N/A",
    Runtime = "N/A",
    imdbRating = "N/A",
    Plot = "No plot available",
    Country = "N/A",
    Production = "N/A",
    Actors = "N/A"
  } = movie;

  return (
    <div className="flex flex-col sm:flex-row bg-black text-white rounded-lg p-6  shadow-lg px-40   gap-10 justify-center">
      <div className="flex-shrink-0">
        <img
          className="rounded-lg w-72 h-auto"
          src={Poster !== "N/A" ? Poster : "/default-poster.jpg"}
          alt={Title}
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-4xl font-bold mb-4">{Title}</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {Genre.split(", ").map((genre, index) => (
              <span
                key={index}
                className="bg-gray-800 px-4 py-2 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 mb-4 text-gray-400">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>{Released}</span>
            <FontAwesomeIcon icon={faClock} />
            <span>{Runtime}</span>
            <FontAwesomeIcon icon={faStar} />
            <span>{imdbRating !== "N/A" ? imdbRating : "N/A"}</span>
          </div>
          <p className="text-gray-400 mb-4 leading-relaxed">{Plot}</p>
        </div>
        <div className="text-gray-400 mb-4">
          <p><span className="font-semibold">Country:</span> {Country}</p>
          <p><span className="font-semibold">Production:</span> {Production}</p>
          <p><span className="font-semibold">Actors:</span> {Actors}</p>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full self-start">
          + Add to Favourite
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;

