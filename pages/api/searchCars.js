// API endpoint that :
// 1. searches for cars by make and model using the API Ninjas Cars API
// 2. formats the response, and returns the results as JSON.

export default async function handler(req, res) {
  try {
      const { make, model } = req.query;
      const apiKey = process.env.NEXT_PUBLIC_CAR_API_KEY;

      if (!apiKey) {
          return res.status(500).json({ error: "API key is missing. Check .env.local file." });
      }

      let apiUrl = `https://api.api-ninjas.com/v1/cars?make=${make}`;
      if (model) {
          apiUrl += `&model=${model}`;
      }

      const response = await fetch(apiUrl, {
          headers: { "X-Api-Key": apiKey },
          cache: "no-store",
      });

      if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!data || data.length === 0) {
          return res.status(404).json({ error: "No cars found. Try different search terms." });
      }

      const formattedData = data.map((car, idx) => ({
          id: `${car.make}-${car.model}-${car.year}-${idx}`,
          make: capitalize(car.make),
          model: capitalize(car.model),
          year: car.year,
          fuel_type: car.fuel_type,
          city_mpg: car.city_mpg,
          highway_mpg: car.highway_mpg,
          drive: car.drive,
          cylinders: car.cylinders,
          transmission: car.transmission,
          class: car.class,
      }));

      return res.status(200).json(formattedData);
  } catch (error) {
      console.error("searchCars API Error:", error);
      return res.status(500).json({ error: error.message });
  }
}

function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
