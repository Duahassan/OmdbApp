"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchTerm.length > 2) {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${searchTerm}&apikey=16d251ac`
          );
          const data = await response.json();
          if (data.Search) {
            setSearchResults(data.Search);
            setDropdownVisible(true); // Show dropdown when results are found
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setDropdownVisible(false); // Hide dropdown when search term is too short
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchMovies();
    }, 500); // Debounce search input

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <nav className="bg-black fixed w-full top-0 z-50 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Left Links */}
        <div className="flex space-x-6 text-white">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <Link href="/genre" className="hover:text-red-500">Genre</Link>
          <Link href="/country" className="hover:text-red-500">Country</Link>
        </div>

        {/* Search Bar */}
        <div ref={searchRef} className="relative w-1/3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-black rounded-full py-2 px-4 pl-10 focus:outline-none"
            placeholder="Search movies..."
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          </div>

          {/* Search Results Dropdown */}
          {isDropdownVisible && searchResults.length > 0 && (
            <div className="absolute bg-white text-black w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map((movie) => (
                <Link
                  href={`/movie/${movie.imdbID}`}
                  key={movie.imdbID}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  {movie.Title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Links */}
        <div className="flex space-x-6 text-white items-center">
          <Link href="/movies" className="hover:text-red-500">Movies</Link>
          <Link href="/series" className="hover:text-red-500">Series</Link>
          <Link href="/animation" className="hover:text-red-500">Animation</Link>
          <Link href="/login" className="hover:text-red-500">Login/Signup</Link>
          <BellIcon className="h-5 w-5 text-white hover:text-red-500" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
