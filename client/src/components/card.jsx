import React from "react";


function DisplayCard(props){
    return (
    <div className="card">
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

            )}}>Delete</button>
        }
        { //this checks to see if displaybuttons is true, and if yes, then it executes whatever is after the &&... Pretty neat!
        props.displayButons === true && <div class="counterbox">
            <p style={{color:"white"}}>{props.count}</p>
        </div> }
        
    </div>);


}



export default DisplayCard;