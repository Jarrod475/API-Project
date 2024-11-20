import express, { json } from "express";
import cors from "cors";

const app = express();
const PORT = 5000; // Backend runs on port 5000

// Middleware
app.use(cors()); // Allow requests from React frontend
app.use(json()); // Parse JSON request body

// Mock data
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

// Route to get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});