//This page fetches and displays all car reviews from the API endpoint `/api/personalReview`.

import { useState, useEffect } from "react";
import PersonalReview from "../components/PersonalReview";
import styles from "../styles/getreview.module.css";
import Navbar from "@/components/Navbar";

export default function GetReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/personalReview");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return (
    <div className={styles.newsPage}>
      <Navbar />
      <h1 className={styles.title}>Car Reviews</h1>
      <div className={styles.newsContent}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <p className={styles.noArticles}>No reviews available.</p>
        ) : (
          <div className={styles.newsGrid}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.newsCard}>
                <div className={styles.cardContent}>
                  <h2 className={styles.newsTitle}>{review.carModel}</h2>
                  <p>
                    <strong>Rating:</strong> {review.rating}
                  </p>
                  <p className={styles.newsDescription}>{review.comments}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          className={styles.searchButton}
          onClick={() => setShowModal(true)}
        >
          Write a Review
        </button>
      </div>

      {showModal && (
        <>
          <div
            className={styles.modalOverlay}
            onClick={() => setShowModal(false)}
          ></div>
          <div className={styles.authModal}>
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <PersonalReview />
          </div>
        </>
      )}
    </div>
  );
}
