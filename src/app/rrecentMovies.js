// pages/api/recentMovies.js
export default function handler(req, res) {
    const movies = [
      { id: 1, title: "Movie 1", year: "2023" },
      { id: 2, title: "Movie 2", year: "2023" },
      { id: 3, title: "Movie 3", year: "2023" },
      { id: 4, title: "Movie 4", year: "2023" },
      { id: 5, title: "Movie 5", year: "2023" },
      { id: 6, title: "Movie 6", year: "2023" },
      { id: 7, title: "Movie 7", year: "2023" },
      { id: 8, title: "Movie 8", year: "2023" },
      { id: 9, title: "Movie 9", year: "2023" },
      { id: 10, title: "Movie 10", year: "2023" },
    ];
    res.status(200).json(movies);
  }
  