import React from "react";

function Navbar(props){
    return(
        <div className="navbar">
            <button className="navbutton" onClick={props.displayCollection}>View collection</button>
            <button className="navbutton" onClick={props.displayInputField}>View All</button>
        </div>
    );

}
export default Navbar;