import React, {useEffect, useRef, useState} from "react";
// import background from '../../assets/background.png'
import './DisplayArea.css'
import {useSelector, useDispatch} from 'react-redux'

export default function DisplayArea() {
    const images = useSelector((state) => state.imagesData.items);
    const [choosen, setChoosen] = React.useState(-1);
    const backgroundHeight = useSelector((state) => state.imagesData.backgroundHeight)
    const backgroundWidth = useSelector((state) => state.imagesData.backgroundWidth);
    const backgroundRef = React.useRef(null);

    let bodyWidth = document.documentElement.clientWidth;
    let bodyHeight = document.documentElement.clientHeight;
    let backgroundLeft = (bodyWidth - 400) / 2 + 400;
    let backgroundTop = bodyHeight * 0.5;

    const [windowScale, setWindowScale] = React.useState(1);

    window.onload = () => {
        setWindowScale(1 / window.devicePixelRatio.toFixed(2));
    };
    window.onresize = () => {
        setWindowScale(1 / window.devicePixelRatio.toFixed(2));
        setShowPreferens(false)
        bodyWidth = document.documentElement.clientWidth;
        bodyHeight = document.documentElement.clientHeight;

        backgroundLeft = (bodyWidth * 0.8) / 2 + bodyWidth * 0.2;
        backgroundTop = bodyHeight * 0.5;
        backgroundRef.current.style.left = backgroundLeft + 'px';
        backgroundRef.current.style.top = backgroundTop + 'px';
    }


    const [showPreferens, setShowPreferens] = useState(false);
    const [holden, setHolden] = React.useState(-1);

    const choosenRef = useRef();

    const [choosenWidth, setChoosenWidth] = React.useState(0);
    const [choosenHeight, setChoosenHeight] = React.useState(0);

    const buttomSize = 60;
    return (
        <div className='displayArea'
             onClick={() => {
                 setShowPreferens(false);
             }
             }
             onMouseUp={() => {
                 document.onmousemove = null;
             }}
        >
            <div className="background" ref={backgroundRef}

                 style={{
                     'height': backgroundHeight + 'px',
                     'width': backgroundWidth + 'px',

                     'left': backgroundLeft + 'px',
                     'top': backgroundTop + 'px',
                 }}

            >
                {images.map((item, index) =>

                    <img src={item.url} className={`image ${index == holden ? 'active' : ""}`}
                         ref={index == choosen ? choosenRef : null}

                         style={{
                             'transform': 'translate(-50%,-50%)',
                             'height': item.height + 'px',
                             'width': item.width + 'px',
                             'min-height': 30 + 'px',
                             'min-width': 30 + 'px',
                             'left': backgroundWidth / 2 + 'px',
                             'top': backgroundHeight / 2 + 'px',

                         }}
                         onMouseDown={(e) => {

                             setShowPreferens(false);

                             setChoosen(index);
                             setChoosenWidth(parseInt(e.target.style.width));
                             setChoosenHeight(parseInt(e.target.style.height));
                             setHolden(index);

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
                             setShowPreferens(true);
                             setHolden(-1)

                         }}

                    />
                )}

            </div>
            {showPreferens == true ? (

                [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]].map((item) =>
                    <button

                        style={(Math.abs(item[0]) == 1 && Math.abs(item[1]) == 1) ?
                            {
                                'width': buttomSize+12 + 'px',
                                'height': buttomSize+12 + 'px',

                                'left': parseInt(choosenRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(backgroundRef.current.style.width) / 2 + (choosenWidth / 2 + buttomSize / 2 +5) * item[0] + 'px',
                                'top': parseInt(choosenRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + (choosenHeight / 2 + buttomSize / 2+5) * item[1] + 'px',
                            }
                            :
                            {
                                'width': buttomSize + (choosenWidth - buttomSize ) * Math.abs(item[1]) + 'px',
                                'height': buttomSize + (choosenHeight - buttomSize ) * Math.abs(item[0]) + 'px',

                                'left': parseInt(choosenRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(backgroundRef.current.style.width) / 2 + (choosenWidth / 2 + buttomSize / 2) * item[0] + 'px',
                                'top': parseInt(choosenRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + (choosenHeight / 2 + buttomSize / 2) * item[1] + 'px',
                            }
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onMouseDown={() => {
                            document.onmousemove = function (ev) {
                                let transfrormX = ev.movementX * 2 * windowScale;
                                let transfrormY = ev.movementY * 2 * windowScale;
                                choosenRef.current.style.width = parseInt(choosenRef.current.style.width) + transfrormX * item[0] + 'px'
                                choosenRef.current.style.height = parseInt(choosenRef.current.style.height) + transfrormY * item[1] + 'px'

                                setChoosenWidth(parseInt(choosenRef.current.style.width));
                                setChoosenHeight(parseInt(choosenRef.current.style.height));
                            }
                        }}

                        onMouseUp={() => {
                            document.onmousemove = null;
                        }}

                    />
                )
            ) : ''}
        </div>
    )
}