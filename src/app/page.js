import Image from "next/image";
import "./globals.css";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Movie from "./components/movie-api-fetch";
import RecentMovie from "./components/recentlyaddedmovies";
import Card from "./components/recentmoviecard";
import Newreleasemovies from "./components/New Release - Movies";
import Newreleaseseries from "./components/newseries";
import Recomandedmovies from "./components/recomanded";
import Slider from "./components/slider";
import Careusel from "./components/slider";
import CombinedComponent from "./components/recentlyupload";
import TrendingMovies from "./components/trendingmovies"
// import avaterImage from '../images/99.png';


export default function Home() {
  let slides = [
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_G9Pv0adJG7luJf_o0dGqfsdHDuo--srU5g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgScO8ivb3nxl6gd_jfplFs9EuNBSIrsgm8w&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeAYnfPulRpGOUxqz20DmUnOxz5ylv3opkgA&s"
  ];

  return (
    <main className="">
     
      <Navbar />
      <Hero />
      
      <Slider />
       <CombinedComponent/>
       {/* <CombinedComponent1/> */}
      {/* <RecentMovies /> */}
      <TrendingMovies />
      <Newreleasemovies />
      <Newreleaseseries />
      <Recomandedmovies />
      {/* <RecentMovie/> */}
       {/* <Movie/>  */}
    </main>
  );
}
