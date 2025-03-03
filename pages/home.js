// The homepage which has a car search tool that allows users to find cars by make and model.

import { useState } from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import styles from "../styles/SearchBox.module.css";

export default function HomePage() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSearch = async () => {
    if (!make) {
      setError("Please select a car make before searching.");
      return;
    }

    setLoading(true);
    setCars([]);
    setError("");

    try {
      const response = await fetch(`/api/searchCars?make=${make}&model=${model}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setCars(data);
      }
    } catch (err) {
      console.error("Client fetch error:", err);
      setError("Failed to fetch car data. Check your API key or network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.searchBox}>
          <h2>Find your next car</h2>

          <select value={make} onChange={(e) => setMake(e.target.value)}>
            <option value="">Select Make (e.g. Toyota)</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="ford">Ford</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes</option>
            <option value="tesla">Tesla</option>
          </select>

          <input
            type="text"
            placeholder="Enter model (optional)"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />

          <button className={styles.searchButton} onClick={handleSearch}>
            {loading ? "Searching..." : "Search"}
          </button>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.carList}>
            {cars.map((car) => (
              <div
                key={car.id}
                className={styles.carItem}
                onClick={() => setSelectedCar(car)}
              >
                <h3>
                  {car.make} {car.model} ({car.year})
                </h3>
                <p>{car.fuel_type} | {car.drive?.toUpperCase()} | {car.transmission?.toUpperCase()}</p>
                <p>
                  City MPG: {car.city_mpg} | Hwy MPG: {car.highway_mpg}
                </p>
                <button className={styles.detailsBtn}>View Details</button>
              </div>
            ))}
          </div>

          {selectedCar && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2>
                  {selectedCar.make} {selectedCar.model} ({selectedCar.year})
                </h2>
                <p>Fuel Type: {selectedCar.fuel_type}</p>
                <p>Drive: {selectedCar.drive}</p>
                <p>Transmission: {selectedCar.transmission}</p>
                <p>Cylinders: {selectedCar.cylinders}</p>
                <p>Class: {selectedCar.class}</p>
                <p>City MPG: {selectedCar.city_mpg} | Highway MPG: {selectedCar.highway_mpg}</p>
                <button className={styles.closeBtn} onClick={() => setSelectedCar(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
