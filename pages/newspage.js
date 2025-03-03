// News page that fetches and displays the latest automotive news with search functionality

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/NewsPage.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

export default function NewsPage({ initialArticles = [], initialError }) {
  const [articles, setArticles] = useState(initialArticles);
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("automotive");
  const [searchInput, setSearchInput] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let query = searchQuery;
        if (!query.toLowerCase().includes('automotive')) {
          query = `automotive ${query}`;
        }
        
        const response = await fetch(
          `/api/fetchnews?q=${encodeURIComponent(query.trim())}&page=${currentPage}&pageSize=${pageSize}`
        );
        
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.error || `API returned ${response.status}`);
        }
        
        setArticles(responseData.articles || []);
        setTotalResults(responseData.totalArticles || 0);
        setTotalPages(responseData.totalPages || 1);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch news");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [searchQuery, currentPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Unknown Date") return "Unknown Date";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className={styles.newsPage}>
      <Navbar />
      
      <div className={styles.newsContent}>
        <h1 className={styles.title}>Latest Automotive News</h1>
        
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search automotive news..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading automotive news...</p>
          </div>
        )}

        {error && <p className={styles.noArticles}>Error: {error}</p>}

        {!loading && !error && articles.length === 0 && (
          <p className={styles.noArticles}>No automotive news articles found</p>
        )}

        {!loading && !error && articles.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div className={styles.newsGrid} initial="hidden" animate="show" exit="hidden">
              {articles.map((article, index) => (
                <motion.div key={`${article.url}-${index}`} className={styles.newsCard}>
                  <img 
                    src={article.image || "/default.jpg"}
                    alt={article.title} 
                    className={styles.newsImage}
                    onError={(e) => { e.target.src = "/default.jpg"; }}
                  />
                  <div className={styles.cardContent}>
                    <h3 className={styles.newsTitle}>{truncateText(article.title, 85)}</h3>
                    <p className={styles.newsSource}>
                      {article.source && (
                        <>
                          {article.source_url ? (
                            <a href={article.source_url} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                              {article.source}
                            </a>
                          ) : (
                            article.source
                          )}
                          {' · '}
                        </>
                      )}
                      {formatDate(article.published_at)}
                    </p>
                    <p className={styles.newsDescription}>{truncateText(article.description, 150)}</p>
                    
                    {article.url ? (
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                        Learn More →
                      </a>
                    ) : (
                      <p className={styles.noArticles}>No link available</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className={styles.pagination}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={styles.pageArrow}>
              &larr;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? styles.activePage : ''}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={styles.pageArrow}>
              &rarr;
            </button>
          </div>
        )}
      </div>

      <Footer/>
    </div>
  );
}
