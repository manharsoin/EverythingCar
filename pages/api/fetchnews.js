// API endpoint doing the following tasks:
// 1. fetches news articles from the GNews API 
// 2. processes the data
// 3. caches it for 30 minutes 
// 4. returns it as a JSON response.

let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000;

export default async function handler(req, res) {
  const currentTime = Date.now();

  const searchQuery = req.query.q || "automotive";
  const language = req.query.lang || "en";
  const country = req.query.country || "us";
  const maxResults = req.query.max || "50";
  const sortBy = req.query.sortBy || "publishedAt";

  const cacheKey = `${searchQuery}-${language}-${country}-${maxResults}-${sortBy}`;

  if (cachedData && cachedData.key === cacheKey && currentTime - lastFetchTime < CACHE_DURATION) {
    return res.status(200).json({ articles: cachedData.data });
  }

  try {
    const apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=${language}&country=${country}&max=${maxResults}&sortby=${sortBy}&apikey=${process.env.GNEWS_API_KEY}`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: `API returned ${response.status}` });
    }

    const data = await response.json();
    
    if (!data || !data.articles || data.articles.length === 0) {
      return res.status(404).json({ error: "No news articles found" });
    }

    const processedArticles = data.articles.map((article) => ({
      title: article.title || "No title",
      description: article.description || "No description available",
      content: article.content || "No content available",
      url: article.url || null,
      image: article.image || "/default.jpg",
      published_at: article.publishedAt || "Unknown Date",
      source: article.source?.name || "Unknown Source",
      source_url: article.source?.url || null
    }));

    cachedData = {
      key: cacheKey,
      data: processedArticles
    };
    
    lastFetchTime = currentTime;

    return res.status(200).json({ articles: processedArticles, totalArticles: data.totalArticles || 0 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
