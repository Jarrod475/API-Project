import React from "react";


function DisplayCard(props){
    return (
    <div>
        <p id="cardName" >{props.name}</p>
        <img src={props.imgURL} alt="card" />
        {props.displayButons  !== true ? <button onClick={()=>{props.clickFunc(
            {
                id : props.cardid,
                name : props.name,
                imgLink : props.imgURL
            }
            );}}>add</button> : 
            <button onClick={()=> {props.deleteFunc(
                props.cardid

            )}}>Delete</button>}
    </div>);
}



export default DisplayCard;