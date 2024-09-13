"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

const CombinedComponent = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [titles, setTitles] = useState([
    "Inception", "The Matrix", "Interstellar", "Avengers"
  ]);

  useEffect(() => {
    // Initial fetch on component mount
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const moviePromises = titles.map((title) =>
        fetch(`http://www.omdbapi.com/?apikey=16d251ac&t=${title}`).then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
      );

      const movieData = await Promise.all(moviePromises);
      setMovies(movieData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleArrowClick = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch new movie based on the current title in sequence or any logic you prefer
      const newTitle = titles[(Math.floor(Math.random() * titles.length))];
      const response = await fetch(`http://www.omdbapi.com/?apikey=16d251ac&t=${newTitle}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const newMovie = await response.json();

      // Replace the existing movies with the newly fetched movie
      setMovies([newMovie]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-black gap-10 justify-center px-6 sm:px-20 py-10">
      {/* Movie List Section */}
      <div className="flex flex-col gap-6">
        <h1 className="text-white font-bold mt-10">Recently Uploaded</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-10">
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {movies.length > 0 && !loading && !error && movies.map((movie) => (
            <div key={movie.imdbID} className="flex gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <img
                  className="rounded-lg w-36 h-44"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </div>
              <div className="flex flex-col text-white items-start">
                <h3 className="text-normal font-bold text-white">{movie.Title}</h3>
                <p>{movie.Genre}</p>
                <p>{movie.Released}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              onClick={handleArrowClick}
              className="fa-thin fa-arrow-right text-white py-2 px-2 w-14 h-14 rounded-full cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedComponent;




// "use client";
// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleRight, faClock, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

// const CombinedComponent = () => {
//   const [movies, setMovies] = useState([]);
//   const [title, setTitle] = useState("Inception");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Fetch multiple movies. Adjust the titles as needed for different movies.
//         const movieTitles = ["Inception", "The Matrix", "Interstellar", "Avengers"];
//         const moviePromises = movieTitles.map((title) =>
//           fetch(`http://www.omdbapi.com/?apikey=16d251ac&t=${title}`).then((response) => {
//             if (!response.ok) throw new Error("Network response was not ok");
//             return response.json();
//           })
//         );

//         const movieData = await Promise.all(moviePromises);
//         setMovies(movieData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   const handleMovieSearch = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`http://www.omdbapi.com/?apikey=16d251ac&t=${title}`);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setMovies([data]); // Replace existing movies with the search result
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col bg-black gap-10 justify-center px-6 sm:px-20 py-10"> 
//       {/* Movie List Section */}
//       <div className="flex flex-col gap-6">
//         <h1 className="text-white font-bold mt-10">Recently Uploaded</h1>
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-10">
//           {loading && <p className="text-gray-500">Loading...</p>}
//           {error && <p className="text-red-500">Error: {error}</p>}
//           {movies.length > 0 && !loading && !error && movies.map((movie) => (
//             <div key={movie.imdbID} className="flex gap-4 sm:gap-6">
//               <div className="flex-shrink-0">
//                 <img
//                   className="rounded-lg w-36 h-44"
//                   src={movie.Poster}
//                   alt={movie.Title}
//                 />
//               </div>
//               <div className="flex flex-col text-white items-start">
//                 <h3 className="text-normal font-bold text-white">{movie.Title}</h3>
//                 <p>{movie.Genre}</p>
//                 <p>{movie.Released}</p>
//               </div>
//             </div>
//           ))}
//           <div className="flex justify-center sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
//             <FontAwesomeIcon
//               icon={faArrowAltCircleRight}
//               className="fa-thin fa-arrow-right text-white py-2 px-2 w-14 h-14 rounded-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CombinedComponent;
