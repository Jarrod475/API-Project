import React, { useEffect, useState } from "react";
import axios from "axios";



function getData(){
  axios.get('https://api.magicthegathering.io/v1/cards', {
    params: {
      supertypes: "legendary",
      types : "creature"
    }
  })
  .then(function (response) {
    console.log(response.data.cards);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
  
})}



const App = () => {
  const [items, setItems] = useState([]); // State to store data

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items") // URL of the Express API
      .then((response) => {
        setItems(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={getData}>CLick me</button>
    </div>
  );
};

export default App;
