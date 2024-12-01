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
  return items;
}

//write data to database by first checking if their is a record already with that data. if so it increments the count. otherwise it just makes a new record.
async function writeData(newCard)
{

  try{
   await db.query(`INSERT INTO mycards (id, name, link, count) VALUES ($1, $2, $3, 1)`, [newCard.id, newCard.name, newCard.imgLink]);
  }catch(err){
   await db.query(`UPDATE mycards SET count = count + 1 WHERE id = $1`,[newCard.id]);
    console.log("WE CAUGHT AN ERROR ", err);
  }  
  console.log("new card added to database");  
}


//delete card with given ID
function deleteData(id){
  db.query('DELETE FROM mycards WHERE id=$1',[id]);
  console.log("card deleted from DB with ID :",id);
}
// reduces the card count by one then returns the amount left over.
async function reduceCard(id){
  await db.query('UPDATE mycards SET count = count - 1 WHERE id = $1 ',[id]);
  await db.query('DELETE FROM mycards WHERE count < 1');
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
  writeData(data.body);
  res.send("card saved succesfully!");
});
// Route to get all cards from DB
app.get("/collection", async(req,res)=>{
  let cards = await readData();
  res.json(cards);
});

 // Route to delete a card with given ID from DB
app.delete("/collection", async(req,res)=>{
  await reduceCard(req.query.id);
  res.send("card deleted succesfully");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

