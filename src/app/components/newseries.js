"use client"
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faClock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'; // For API requests

const API_KEY = '16d251ac'; // Replace with your OMDB API key
const API_URL = 'https://www.omdbapi.com/';

const NewReleaseSeries = () => {
  const [series, setSeries] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            apikey: API_KEY,
            s: 'series', // Adjust search term as needed
            type: 'series', // Fetch only series
          },
        });
        setSeries(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  const handleViewAll = () => {
    setShowAll(!showAll);
  };

  const defaultSeriesCount = 4;
  const seriesToShow = showAll ? series : series.slice(0, defaultSeriesCount);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-10 justify-center px-20 py-10 bg-black">
      <div className="flex justify-between">
        <h1 className="text-white font-bold">New Release Series</h1>
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
        {seriesToShow.map((serie) => (
          <div key={serie.imdbID} className="flex flex-col shadow-lg rounded-lg relative w-64 h-80">
            <div>
              <img className="rounded-lg w-52 h-64" src={serie.Poster} alt={serie.Title} />
            </div>
            <div className="flex justify-between mt-2">
              <h3 className="text-normal text-slate-600">{serie.Title}</h3>
              <div className="flex gap-2">
                <button className="bg-red-500 hover:bg-red-300 text-white rounded px-2">
                  HD
                </button>
                <button className="bg-transparent hover:bg-red-300 ring-1 ring-orange-700 ring-inset text-white rounded px-2 flex items-center">
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
    </div>
  );
};

export default NewReleaseSeries;
