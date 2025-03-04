//API endpoint for handling personal car reviews.
//Supports adding new reviews (POST) and retrieving all reviews (GET).
 
import { db } from "../../lib/firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  console.log("Incoming request:", req.method);

  if (req.method === "POST") {
    try {
      console.log("POST request received:", req.body);
      const { carModel, rating, comments } = req.body;
      if (!carModel || !rating || !comments) {
        console.error("Validation error: Missing fields");
        return res.status(400).json({ error: "All fields are required" });
      }
      console.log("Adding new review to Firestore...");
      const docRef = await addDoc(collection(db, "personal_reviews"), {
        carModel,
        rating: Number(rating),
        comments,
        createdAt: serverTimestamp(),
      });
      console.log("Review added successfully:", docRef.id);
      return res.status(201).json({ success: true, id: docRef.id });
    } catch (error) {
      console.error("Firestore Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      console.log("Fetching all reviews from Firestore...");
      const querySnapshot = await getDocs(collection(db, "personal_reviews"));
      const reviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Reviews fetched successfully:", reviews.length);
      return res.status(200).json(reviews);
    } catch (error) {
      console.error("Firestore Fetch Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
  } else {
    console.error("Method not allowed:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }
}
