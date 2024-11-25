import express, { json } from "express";
import cors from "cors";
import pg from "pg";


const app = express();
const PORT = 5000; // Backend runs on port 5000


// Middleware
app.use(cors()); // Allow requests from React frontend
app.use(json()); // Parse JSON request body

//---database functions and stuff---

//connecting to the Postgres database! 
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "cardbook",
  password: "password",
  port: 5432
});
db.connect( )

//get the data from the database
async function readData()
{
  const data = await db.query("SELECT * FROM mycards");
  let items = data.rows;
  console.log("card data is :", items);
  return items;
}

//write data to database
function writeData(newCard)
{
  db.query('INSERT INTO mycards (id,name,link)  VALUES ($1,$2,$3)',[newCard.id,newCard.name,newCard.imgLink]);
  console.log("new card added to database");  
}




// Mock data
const item =  "Welcome!";

//    ----routes-----

// Route to get all items
app.get("/welcome", (req, res) => {
  res.send(item) ;
});

//route to store new card data
app.post("/addcard" , (req,res)=>{
  let data =  req;
  res.send("card saved succesfully!");
  console.log("recieving data from client:", data.body);
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

