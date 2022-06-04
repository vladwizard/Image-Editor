import React from "react";
import imgObg from "./img";

function ChooseImageTable(props) {
    function hasChosenChange(e) {
        props.chooseImage(e.target.name);
    }

    const listItems = imgObg.map((x, index) =>

        <button className='cellImageTable' onClick={hasChosenChange} name={index} key={index}
                style={{"backgroundImage": "url(" + x + ")"}}
        />
    )
    return (
        <div className='chooseImageArea'>
            {listItems}
        </div>
    );
}
export default ChooseImageTable;