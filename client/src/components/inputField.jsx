import React, {  useState } from "react";



function InputField(props){
    //states!
    const [queryData,setData] =  useState({});
    //this functions creates an object to send to the parent that includes the required query params for the Magic API
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
    }


    return(
        <div>
            <p>Subtype (vampire, warrior, etc.)</p>
            <input name="subtypes" onChange={editData} type="text" />
            <p>card name</p>
            <input name="name" onChange={editData} type="text" />
            <p>colour</p>
            <input name="colour" onChange={editData} type="text" />
            <button onClick={()=>{props.onSubmit(queryData)}}>Search</button>
        </div>
    )
}

export default InputField;