import React, { useEffect, useState } from "react";
import axios from "axios";
import InputField from  "./components/inputField.jsx";
import DisplayCard from "./components/card.jsx";



// le app
const App = () => {
  //states!
  const [welcomeMSG, setMSG] = useState("loading..."); 
  const [cardData,setCardData] = useState([]);

  
  async function getData(dataObject){
    console.log(dataObject);
      await axios.get('https://api.magicthegathering.io/v1/cards', {
       params: dataObject
     })
     .then(function (response) {
       setCardData(response.data.cards);
     })
     .catch(function (error) {
       console.log(error);
     })
     .finally(function () {
     
   })}

   // so this guy only runs if it detects changes in the cardData object! pretty cool...
   useEffect(() => {
    if (cardData !== null) { // Avoid logging null on initial render
        console.log("cardData:", cardData);
        //tell app to render cards here!
    }}, [cardData]);




  // Fetch Welcome msg from the backend server thingy (server.js)...
  useEffect(() => {
    axios
      .get("http://localhost:5000/welcome") // URL of the Express API
      .then((response) => {
         setMSG(response.data); // Update welcomeMSG with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Item List</h1>
      <p>{welcomeMSG}</p>
      <InputField onSubmit={getData}/>
      {cardData.length > 0 ? cardData.map((card,index)=>{return <DisplayCard key={index} name ={card.name} imgURL={card.imageUrl}/>}): <p>loading...</p>}
    </div>
  );
};

export default App;
