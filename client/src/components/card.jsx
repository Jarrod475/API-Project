import React from "react";


function DisplayCard(props){
    return (
    <div>
        <p id="cardName" >{props.name}</p>
        <img src={props.imgURL} alt="card" />
        <button onClick={()=>{props.clickFunc(
            {
                id : props.cardid,
                name : props.name,
                imgLink : props.imgURL
            }
            );}}>add</button>
    </div>);
}



export default DisplayCard;