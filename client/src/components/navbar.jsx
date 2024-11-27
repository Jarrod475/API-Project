import React from "react";

function Navbar(props){
    return(
        <div className="navbar">
            <button onClick={props.displayCollection}>View all cards</button>
        </div>
    );

}
export default Navbar;