// API endpoint that:
// 1. searches YouTube for videos based on a query
// 2. fetches results from the YouTube Data API and returns the video list as JSON.

export default async function handler(req, res) {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const { query } = req.query; 
    const searchQuery = query || ""; 
    const MAX_RESULTS = 10;

    const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=${MAX_RESULTS}&key=${YOUTUBE_API_KEY}`;

    try {
        const response = await fetch(YOUTUBE_API_URL);
        const data = await response.json();

        if (!data.items) {
            return res.status(500).json({ error: "Failed to fetch videos" });
        }

        res.status(200).json(data.items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
