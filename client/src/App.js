import React, { useEffect, useState } from "react";
import axios from "axios";
import InputField from  "./components/inputField.jsx";
import DisplayCard from "./components/card.jsx";




// le app
const App = () => {
  //states!
  const [welcomeMSG, setMSG] = useState("loading..."); 
  const [cardData,setCardData] = useState([]);
  const [storeData, setStoreData] = useState();
    
  //functions for components to use

  //gets data from API call
  async function getData(dataObject){
    console.log("the data param object is :",dataObject);
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
   //sends card data to server
  function sendData(dataObject){
    console.log("adding data to database",dataObject);
    setStoreData(dataObject);
  }


  //--------------------routes----------------------//

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

   // sends data to server for storage!
  useEffect(() => {
    if (storeData != null){
    axios
      .post("http://localhost:5000/addcard",storeData)// send data to server
      .then((response) => {
         setMSG(response.data); // Update welcomeMSG if card is saved
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });}  
  }, [storeData]);



  return (
    <div>
      <h1>MY CARD DATABASE</h1>
      <p>{welcomeMSG}</p>
      <InputField onSubmit={getData}/>
      <div class="cardHolder">
      {cardData.length > 0 ? cardData.map((card,index)=>{return <DisplayCard key={index} cardid={card.id} name ={card.name} imgURL={card.imageUrl} clickFunc={sendData}/>}): <p>loading...</p>}
      </div>
    </div>
  );
};

export default App;
