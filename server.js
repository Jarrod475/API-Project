import express, { json } from "express";
import cors from "cors";
import axios from "axios";


const app = express();
const PORT = 5000; // Backend runs on port 5000

// Middleware
app.use(cors()); // Allow requests from React frontend
app.use(json()); // Parse JSON request body

// Mock data
const item =  "Welcome!";

// Route to get all items
app.get("/welcome", (req, res) => {
  res.send(item) ;
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

