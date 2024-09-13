"use client"
// pages/index.js
import React, { useState } from 'react';

export default function Home({ episodes = [] }) { // Default to an empty array
  const [selectedEpisode, setSelectedEpisode] = useState(0);

  if (!episodes.length) {
    return <div>No episodes available.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Season 1</h1>
      <div className="grid grid-cols-2 gap-4">
        {episodes.map((episode, index) => (
          <div
            key={index}
            onClick={() => setSelectedEpisode(index)}
            className={`p-4 border rounded-lg cursor-pointer ${selectedEpisode === index ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            <h2 className="text-lg font-semibold">
              Episode {index + 1}: {episode.Title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`http://www.omdbapi.com/?t=Game of Thrones&Season=1&apikey=${process.env.OMDB_API_KEY}`);
    const data = await res.json();

    if (data.Response === "False") {
      console.error("Error fetching data:", data.Error);
      return { props: { episodes: [] } }; // Return empty array if there's an error
    }

    const episodes = data.Search ? data.Search.slice(0, 6) : []; // Safety check for Search property
    console.log("Fetched episodes:", episodes); // Log the data for inspection

    return {
      props: {
        episodes
      },
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { props: { episodes: [] } }; // Return empty array on fetch error
  }
}
