"use client"
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faClock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const API_KEY = '16d251ac'; // Replace with your OMDB API key
const API_URL = 'https://www.omdbapi.com/';

const NewReleaseMovies = () => {
  const [movies, setMovies] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            apikey: API_KEY,
            s: 'movie', // Use a generic search term to test, e.g., 'movie'
            type: 'movie',
            y: 2023, // Optional: Filter by year
          },
        });

        console.log(response.data); // Debugging: Check the API response here

        if (response.data && response.data.Search) {
          setMovies(response.data.Search);
        } else {
          console.error('No movies found:', response.data);
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

  const defaultMovieCount = 4;
  const moviesToShow = showAll ? movies : movies.slice(0, defaultMovieCount);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="flex flex-col justify-center gap-10 px-20 bg-black py-10">
      <div className="flex justify-between">
        <h1 className="text-white font-bold">New Release Movies</h1>
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
          <div key={movie.imdbID} className="flex flex-col shadow-lg rounded-lg relative w-64 h-80">
            <img className="rounded-lg w-52 h-64" src={movie.Poster} alt={movie.Title} />
            <div className="flex justify-between mt-2">
              <h3 className="text-normal text-slate-600">{movie.Title}</h3>
              <div className="flex justify-end gap-2">
                <button className="bg-red-500 hover:bg-red-300 items-center text-white rounded px-2 py-1">
                  HD
                </button>
                <button className="bg-transparent hover:bg-red-300 ring-1 ring-orange-700 text-white rounded px-2 py-1 flex items-center">
                  3:12:00
                  <FontAwesomeIcon
                    icon={faClock}
                    className="ml-2 h-4 w-4 text-green-50"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default NewReleaseMovies;
