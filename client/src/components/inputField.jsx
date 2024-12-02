import React, {  useState, useEffect } from "react";
import ColorPicker from "./colorpicker";



function InputField(props){
    //states!
    const [queryData,setData] =  useState({});
    const [colorCount, setColorCount] = useState(0);
    const [colourArray,setColourArray] = useState([]);

    //this function creates an object to send to the parent that includes the required query params for the Magic API
    function editData(event) {
        const { name, value } = event.target
        let newval = value;
        //changes array to string so that it can be fed into the params in a way the API understands.
        name === "colors" && (newval = newval.join(", "));
       
        setData((prevValue) => {
            return {
                ...prevValue, // "Spread" (those 3 dots) the existing state to avoid overwriting other fields
                [name]: newval, // Dynamically update the field based on the inputs `name` !
            };
        });
    }
    //this is used by the colorpicker components to create an array of color strings to send to api
    // it creates a fake "event" with an array of all the colours and then feeds that to the editdata function. 
    //i dunno if this is the right way to do stuff but it works so :P
    function updateColors(data){
      
        setColourArray((prevValue)=>{
            const updatedArray = [...prevValue];
            updatedArray[data.id] = data.value
            return updatedArray;
        })
        
    }
    //these things run when the variables in brackets change!
    //so this one runs when colourarray changes // if i dont do it like this this and try to call editdata within another function it just doesnt update or it updates too late.
    useEffect(() => 
    {
        let event = {target : {name : "colors", value : colourArray}}
        editData(event);
    },[colourArray]);
    //and this one when querydata changes. just displays the current query in the console
    useEffect(() => 
        {
        console.log("querydata is :",queryData);
        },[queryData]);

        
    //these are used by the add/remove buttons to create or delete color picker components (max 5)
    function updateColorCount(){
        if (colorCount < 5){
            setColorCount((prevValue) => prevValue + 1);
            //we add a default value of blue to the colour array 
            updateColors({id: colorCount,value: "blue"});
        }
    }
    //deletes all info about card colour    
    function clearColours(){
        setColorCount(0);
        setColourArray([]);
    }

    
    
    return(<div>
        {props.isVisible ?<div>
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
        </div> : <div></div>}
        </div>
    )
}

export default InputField;