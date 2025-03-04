//This component provides a form for users to submit personal car reviews.
//It captures the car model, rating, and comments, and sends the review data
 
import { useState } from "react";
import styles from "../styles/personalReview.module.css";

export default function PersonalReview() {
    const [carModel, setCarModel] = useState("");
    const [rating, setRating] = useState("");
    const [comments, setComments] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        const reviewData = { carModel, rating, comments };

        try {
            const response = await fetch("/api/personalReview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Review submitted successfully!");
                setCarModel("");
                setRating("");
                setComments("");
            } else {
                setError(data.error || "Something went wrong. Try again.");
            }
        } catch (err) {
            setError("Failed to submit. Please check your connection.");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Submit Your Personal Car Review</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>Car Model</label>
                <input 
                    type="text" 
                    className={styles.input} 
                    value={carModel} 
                    onChange={(e) => setCarModel(e.target.value)} 
                    placeholder="Enter car model (e.g., Toyota Corolla)" 
                    required
                />
                <label className={styles.label}>Rating (1-5)</label>
                <select 
                    className={styles.select} 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                    required
                >
                    <option value="">Select Rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                </select>
                <label className={styles.label}>Comments</label>
                <textarea 
                    className={styles.textarea} 
                    value={comments} 
                    onChange={(e) => setComments(e.target.value)} 
                    placeholder="Write your review here..." 
                    required
                ></textarea>
                <button type="submit" className={styles.button}>Submit Review</button>
            </form>
            {message && <p className={styles.successMessage}>{message}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
}
