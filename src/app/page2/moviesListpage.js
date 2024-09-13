// export default async function handler(req, res) {
//     const { title } = req.query; // Get the title from the query string
//     const apiUrl = `https://www.omdbapi.com/?i=tt3896198&apikey=16d251ac=${title}&apikey=${ "16d251ac"}`;

    
//     if (!title) {
//       return res.status(400).json({ error: "Title is required" });
//     }
  
//     const apiKey = process.env.OMDB_API_KEY;
  
//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch movie data' });
//     }
//   }
  