import React, {useState} from "react";

function ColorPicker(props){
    function changeChoice(event){
        props.addcolor(
            {
                value : event.target.value,
                id    : (props.id - 1),
        });
    }

    return(
        <div>
            <select onChange={changeChoice} name="color" id="colorpicker">
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="black">Black</option>
                <option value="white">White</option>
            </select>
        </div>
    )
}


export default ColorPicker;