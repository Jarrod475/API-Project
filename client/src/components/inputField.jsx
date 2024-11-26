import React, {  useState, useTransition } from "react";
import ColorPicker from "./colorpicker";



function InputField(props){
    //states!
    const [queryData,setData] =  useState({});
    const [colorCount, setColorCount] = useState(0);
    //this function creates an object to send to the parent that includes the required query params for the Magic API
    function editData(event){
    const { name, value } = event.target;
        setData(prevValue =>{
            if (name === "subtypes"){
                return{
                    subtypes : value,
                    colour : prevValue.colour,
                    name : prevValue.name,
                };}
            else if (name === "colour"){
                return{
                    subtypes : prevValue.subtypes,
                    colour : value,
                    name : prevValue.name
                };
            }
            else if (name === "name"){
                return{
                    colour : prevValue.colour,
                    subtypes : prevValue.subtypes,
                    name : value,
                };}
        });
        console.log("query data is now: ", queryData);
    }
    //this is used by the colorpicker components to create an array of color strings to send to api
    // it creates a fake "event" with an array of all the colours and then feeds that to the editdata function. 
    //i dunno if this is the right way to do stuff but it works so :P
    function updateColors(data){
        let event = {target : {name : "colour", value : data.value}}
        editData(event);
    }
    //these are used by the add/remove buttons to create or delete color picker components (max 5)
    function updateColorCount(){
        if (colorCount < 5){
            setColorCount((prevValue) => prevValue + 1);
        }
    }

    function clearColours(){
        setColorCount(1);
    }

    return(
        <div>
            <p>Subtype (vampire, warrior, etc.)</p>
            <input name="subtypes" onChange={editData} type="text" />
            <p>card name</p>
            <input name="name" onChange={editData} type="text" />
            <p>colours</p>
             {[...Array(colorCount)].map((num, index) =>  <ColorPicker id={index} key={index} addcolor={updateColors} />)}
            <button onClick={updateColorCount}>add color</button>
            <button onClick={clearColours}>reset colour choices</button>
            <br/>
            <button onClick={()=>{props.onSubmit(queryData)}}>Search</button>
        </div>
    )
}

export default InputField;