
"use client"
import { useState, useEffect } from "react";

export default function Movie() {
  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState("Inception");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=16d251ac&t=${title}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [title]);

  return (
    <div>
      <h1>Movie: {title}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter movie title"
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movie && !loading && !error && (
        <div>
          <p>Title: {movie.Title}</p>
          <p>Year: {movie.Year}</p>
          <p>Rated: {movie.Rated}</p>
          <p>Released: {movie.Released}</p>
          <p>Runtime: {movie.Runtime}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Director: {movie.Director}</p>
          <p>Writer: {movie.Writer}</p>
        </div>
      )}
    </div>
  );
}
