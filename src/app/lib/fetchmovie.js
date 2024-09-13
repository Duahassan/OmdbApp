// lib/getMovieDetails.js
const OMDB_API_KEY= "16d251ac";

export const fetchPopularMovies = async () => {
  const popularTitles = ["Inception", "The Dark Knight", "Interstellar", "The Matrix"];
  const movies = await Promise.all(
    popularTitles.map(async (title) => {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}`);
      const data = await response.json();
      if (data.Response === "True") {
        return data;
      } else {
        throw new Error(`Failed to fetch details for movie: ${title}`);
      }
    })
  );
  return movies;
};
export const fetchMovieVideo = async (movieId) => {
  const response = await fetch(`http://www.omdbapi.com/?apikey=16d251ac&t=${movieId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie video: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results.find(video => video.type === 'Trailer'); // Returns the first trailer found
};


export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=16d251ac&t=${movieId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
