import React, { useEffect, useState } from "react";
import axios from "axios";
import InputField from  "./components/inputField.jsx";
import DisplayCard from "./components/card.jsx";
import Navbar from './components/navbar';



// le app
const App = () => {
  //states!
  const [welcomeMSG, setMSG] = useState("loading..."); 
  const [cardData,setCardData] = useState([]);
  const [storeData, setStoreData] = useState();
  //this one is given to all the card components, so that they know to hide their "add" button when its a collection of cards from the db and not the API.
  const [isCollection, setIsCollection] = useState(false);
    
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
      setIsCollection(false);
     
   })}
   //sends card data to server
  function sendData(dataObject){
    console.log("adding data to database",dataObject);
    setStoreData(dataObject);
  }

  //gets all the cards from the personal database
  async function getCollection(){
    await axios.get('http://localhost:5000/getcards')
    .then(function (response) {
      setCardData(response?.data || []); //so the question mark (response?.data) makes it return le false if it doesnt have a .data param...
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      setIsCollection(true)
  })} 

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
      <Navbar displayCollection={getCollection}/>
      <InputField onSubmit={getData}/>
      <div class="cardHolder">
      {cardData.length > 0 ? cardData.map((card,index)=>
          {return <DisplayCard 
            key={index} 
            cardid={card.id} 
            displayButons={isCollection} 
            name ={card.name} 
            imgURL={card?.imageUrl || card.link} // again using that '?' to make the query return either .imageUrl and if that doesnt exist .link!!! 
            clickFunc={sendData}/>
          }): <p>loading...</p>}
      </div>
    </div>
  );
};

export default App;
