// Reviews page that fetches and displays car review videos from YouTube with a search feature.

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Reviews.module.css";
import Footer from "../components/Footer";

export default function Reviews() {
    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchVideos = async (query) => {
        try {
            const res = await fetch(`/api/youtube?query=${query || "car reviews"}`);
            const data = await res.json();
            setVideos(data);
        } catch (error) {
            console.error("Error fetching YouTube videos:", error);
        }
    };

    useEffect(() => {
        fetchVideos("car reviews");
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchVideos(searchQuery);
    };

    return (
        <div className={styles.reviewsPage}>
            <Navbar />

            <div className={styles.container}>
                <h1 className={styles.title}>Car Reviews</h1>

                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a car review..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>Search</button>
                </form>

                <div className={styles.grid}>
                    {videos.map((video) => (
                        <div key={video.id.videoId} className={styles.card}>
                            <iframe
                                width="100%"
                                height="200"
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                title={video.snippet.title}
                                allowFullScreen
                            ></iframe>
                            <h3>{video.snippet.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
