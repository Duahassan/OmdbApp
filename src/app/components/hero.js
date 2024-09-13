"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faClock } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";

// Dummy movie data (replace with your data and the image you provided)
const movies = [
  {
    title: "Avatar: The Way of Water",
    background: "url('../images/99.png')", // Use the correct image link path
    genres: ["Action", "Adventure", "Science Fiction"],
    year: "2022",
    duration: "3:12:00",
    rating: "8.5",
    description:
      "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids)...",
  },
  {
    title: "Inception",
    background: "url('/images/99.png')", // You can reuse the same image or change it
    genres: ["Action", "Adventure", "Thriller"],
    year: "2010",
    duration: "2:28:00",
    rating: "8.8",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task...",
  },
  // Add more movies here
];

const Hero = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // You can add arrows if needed
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {movies.map((movie, index) => (
        <div
        key={index}
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}../images/hero.png)`, // Reference the public folder
        }}
      >
        {/* Your content here */}
      
            <div className="h-screen flex flex-col justify-center items-center px-20 bg-black bg-opacity-40"
             style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}../images/hero.png)`, // Reference the public folder
            }}>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 mb-6">
                <button className="bg-red-500 flex items-center hover:bg-red-300 ring-1 ring-black ring-inset text-white font-bold py-2 px-4 sm:py-4 sm:px-5 rounded">
                  Watch Now
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className="ml-2 h-4 w-4 text-green-50"
                  />
                </button>
                <button className="bg-transparent flex items-center hover:bg-red-300 ring-1 ring-orange-700 ring-inset text-white font-bold py-2 px-4 sm:py-4 sm:px-5 rounded">
                  Watch Later
                  <FontAwesomeIcon
                    icon={faClock}
                    className="ml-2 h-4 w-4 text-green-50"
                  />
                </button>
              </div>

              {/* Movie Info */}
              <div className="w-full gap-5 text-center justify-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {movie.title}
                </h1>
                <div className="flex justify-center gap-6 flex-wrap sm:flex-nowrap mb-4">
                  <div className="flex gap-2 mb-4 flex-wrap sm:flex-nowrap justify-center">
                    {movie.genres.map((genre, idx) => (
                      <span key={idx} className="bg-gray-50 px-3 py-1 rounded-full">
                        {genre}
                      </span>
                    ))}
                    <span className="flex gap-1 bg-transparent text-white rounded-full items-center">
                      <FontAwesomeIcon
                        icon={faPlayCircle}
                        className="h-4 w-4 text-green-50"
                      />
                      {movie.year}
                    </span>
                    <span className="flex bg-transparent text-white px-3 py-1 rounded-full">
                      {movie.duration}
                    </span>
                    <span className="flex bg-transparent text-white px-3 py-1 rounded-full">
                      {movie.rating}
                    </span>
                  </div>
                </div>
                <div className="sm:w-[50%] w-full text-sm text-gray-50 mx-auto">
                  <p>{movie.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
