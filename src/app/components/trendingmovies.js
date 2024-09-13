"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'; // If using axios

const API_KEY = '16d251ac'; // Replace with your OMDB API key
const API_URL = 'https://www.omdbapi.com/';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            apikey: API_KEY,
            s: 'movie', // Search term, adjust as needed
            type: 'movie',
            sort: 'year',
            // Add more params if needed
          },
        });
        if (response.data.Response === 'True') {
          setMovies(response.data.Search || []);
        } else {
          console.error('Error:', response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  // Define the number of movies to show by default
  const defaultMovieCount = 4;
  const moviesToShow = showAll ? movies : movies.slice(0, defaultMovieCount);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-10 justify-center bg-black px-20 py-10">
      <div className="flex justify-between py-5">
        <h1 className="text-white font-bold">Trending</h1>
        <div className="flex gap-4 items-center">
          <h4
            className="text-white font-bold cursor-pointer"
            onClick={handleViewAll}
          >
            {showAll ? "View less" : "View all"}
          </h4>
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            className="text-white w-8 h-8"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-10 justify-between">
        {moviesToShow.map((movie) => (
          <div
            key={movie.imdbID} // Use unique movie ID
            className="flex flex-col shadow-lg rounded-lg relative w-64 h-80" // Fixed width and height for consistent card size
          >
            <div className="relative h-2/3">
              <img
                className="object-cover w-full h-full rounded-t-lg"
                src={movie.Poster}
                alt={movie.Title}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  className="text-green-50 h-10 w-10"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 h-1/3">
              <h3 className="text-xl font-bold text-slate-600 truncate">
                {movie.Title}
              </h3>
              <div className="flex gap-2 mt-auto">
                <button className="bg-red-500 hover:bg-red-300 text-white py-1 px-3 rounded">
                  Action
                </button>
                <button className="bg-red-500 hover:bg-red-300 text-white py-1 px-3 rounded">
                  Comedy
                </button>
                <button className="bg-red-500 hover:bg-red-300 text-white py-1 px-3 rounded">
                  Thrill
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
