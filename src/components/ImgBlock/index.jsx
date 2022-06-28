import React from "react";
import {useSelector, useDispatch} from 'react-redux'


export default function ImgBlock({index}){

    const imageSelector = useSelector((state) => state.data.images);

    return (
    <img key={item.id} src={item.str}
                         className={`image ${((index) == asserted && chosenType == 'text') ? 'holding' : ""}`+' img'}
                         ref={(index == choosen && chosenType == 'img') ? choosenRef : null}

                         style={{
                             'transform': 'translate(-50%,-50%)',
                             'height': item.height + 'px',
                             'width': item.width + 'px',
                             'minHeight': 30 + 'px',
                             'minWidth': 30 + 'px',
                             'left': backgroundWidth / 2 + 'px',
                             'top': backgroundHeight / 2 + 'px',

                         }}
                         onMouseDown={(e) => {
                             setShowSizeBox(false);
                             setChoosen(index);
                             setChoosenType('img');

                             setChoosenWidth(parseInt(e.target.style.width));
                             setChoosenHeight(parseInt(e.target.style.height));
                             setAsserted(index);

                             document.onmousemove = function (ev) {
                                 e.target.style.left = parseInt(e.target.style.left) + ev.movementX * windowScale + 'px';
                                 e.target.style.top = parseInt(e.target.style.top) + ev.movementY * windowScale + 'px';
                             }
                         }}
                         onClick={(e) => {

                             e.stopPropagation();
                         }}
                         onMouseUp={() => {
                             document.onmousemove = null;
                             setShowSizeBox(true);
                             setAsserted(-1)

                         }}
                    />
                    )
                    }