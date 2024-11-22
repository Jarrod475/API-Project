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
                };}
            else if (name === "colour"){
                return{
                    subtypes : prevValue.subtypes,
                    colour : value,
                };
            }
        });
    }


    return(
        <div>
            <input name="subtypes" onChange={editData} type="text" />
            <input name="colour" onChange={editData} type="text" />
            <button onClick={()=>{props.onSubmit(queryData)}}>Search</button>
        </div>
    )
}



export default InputField;