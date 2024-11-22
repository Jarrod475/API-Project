import React from "react";


function DisplayCard(props){
    console.log(props);
    return (
    <div>
        <p id="cardName" >{props.name}</p>
        <img src={props.imgURL} />
        <button>add</button>
    </div>);
}



export default DisplayCard;