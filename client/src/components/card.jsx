import React from "react";


function card(props){
    return (
    <div>
        <p id="cardName" >{props.name}</p>
        <img url={props.imgURL}></img>
        <button>add</button>
    </div>);
}



export default card;