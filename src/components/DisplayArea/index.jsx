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


    window.onresize = function () {
        bodyWidth = document.documentElement.clientWidth;
        bodyHeight = document.documentElement.clientHeight;

        backgroundLeft = (bodyWidth * 0.8) / 2 + bodyWidth * 0.2;
        backgroundTop = bodyHeight * 0.5;
        backgroundRef.current.style.left = backgroundLeft + 'px';
        backgroundRef.current.style.top = backgroundTop + 'px';
        setShowPreferens(false);
    }

    const [showPreferens, setShowPreferens] = useState(false);
    const [holden, setHolden] = React.useState(-1);
    const [rangeValue, setRangeValue] = React.useState(1);
    const choosenRef = useRef();
    const rangeRef = useRef();


    const [choosenWidth, setChoosenWidth] = React.useState(0);
    const [choosenHeight, setChoosenHeight] = React.useState(0);
    const buttons = [0, 1, 2, 3, 4, 5, 6, 7];
    const buttomIndent = 50;
    return (
        <div className='displayArea'
             onClick={(e) => {
                 // console.log("я первый")
                 setShowPreferens(false);
             }
             }
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
                             'height': item.height + 'px',
                             'width': item.width + 'px',
                             // 'left': backgroundWidth / 2 + 'px',
                             // 'top': backgroundHeight / 2 + 'px',
                             'left': backgroundWidth / 2 + 'px',
                             'top': backgroundHeight / 2 + 'px',
                         }}
                         onMouseDown={(e) => {
                             console.log(e.target.parentElement)
                             setShowPreferens(false);

                             setChoosen(index);
                             setChoosenWidth(parseInt(e.target.style.width));
                             setChoosenHeight(parseInt(e.target.style.height));
                             setHolden(index);

                             document.onmousemove = function (ev) {

                                 e.target.style.left = ev.pageX - parseInt(backgroundRef.current.style.left) + parseInt(backgroundRef.current.style.width) / 2 + 'px';
                                 e.target.style.top = ev.pageY - parseInt(backgroundRef.current.style.top) + parseInt(backgroundRef.current.style.height) / 2 + 'px';

                             }

                         }}
                         onClick={(e) => {
                             // console.log('я втрой');
                             e.stopPropagation();
                         }}
                         onMouseUp={(e) => {
                             document.onmousemove = null;
                             setShowPreferens(true);
                             setHolden(-1)

                         }}

                    />
                )}

            </div>
            {showPreferens == true ? (

                // <input type='range' className='input_range' ref={rangeRef} min={0.1} max={2} step={0.02}
                //        value={rangeValue}
                //        style={{
                //            'height': '30px',
                //            'width': '150px',
                //            'left': parseInt(choosenRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(backgroundRef.current.style.width) / 2 - 75 + 'px',
                //            'top': parseInt(choosenRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 - 15 + 'px',
                //        }}
                //
                //        onClick={(e) => {
                //            // console.log("я третий")
                //            e.stopPropagation();
                //        }}
                //        onChange={(e) => {
                //
                //            setRangeValue(e.target.value);
                //            choosenRef.current.style.width = images[choosen].width * e.target.value + 'px';
                //            choosenRef.current.style.height = images[choosen].height * e.target.value + 'px';
                //
                //        }}
                // />

                [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]].map((item) =>
                    <button

                        style={(Math.abs(item[0]) == 1 && Math.abs(item[1]) == 1) ?
                            {
                                'width': buttomIndent + (choosenWidth / 4) * Math.abs(item[1]) / 2 + 'px',
                                'height': buttomIndent + (choosenWidth / 4) * Math.abs(item[1]) / 2 + 'px',

                                'left': parseInt(choosenRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(backgroundRef.current.style.width) / 2 + (choosenWidth / 2 + buttomIndent / 2) * item[0] + 'px',
                                'top': parseInt(choosenRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + (choosenHeight / 2 + buttomIndent / 2) * item[1] + 'px',
                            }
                            :
                            {
                                'width': buttomIndent * 2 + (choosenWidth / 2 + buttomIndent) * Math.abs(item[1]) + 'px',
                                'height': buttomIndent * 2 + (choosenHeight / 2 + buttomIndent) * Math.abs(item[0]) + 'px',

                                'left': parseInt(choosenRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(backgroundRef.current.style.width) / 2 + (choosenWidth / 2 + buttomIndent / 2) * item[0] + 'px',
                                'top': parseInt(choosenRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + (choosenHeight / 2 + buttomIndent / 2) * item[1] + 'px',
                            }
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onMouseDown={(e) => {
                            document.onmousemove = function (ev) {
                                let transfrormX = ev.movementX * 4;
                                let transfrormY = ev.movementY * 4;

                                // e.target.style.width = buttomIndent * 2 + (choosenWidth / 2 + buttomIndent) * Math.abs(item[1]) + 'px';
                                // e.target.style.height = buttomIndent * 2 + (choosenHeight / 2 + buttomIndent) * Math.abs(item[0]) + 'px';
                                // e.target.style.left = parseInt(choosenRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(backgroundRef.current.style.width) / 2 + (choosenWidth / 2 + buttomIndent / 2) * item[0] + 'px';
                                // e.target.style.top = parseInt(choosenRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + (choosenHeight / 2 + buttomIndent / 2) * item[1] + 'px';

                                choosenRef.current.style.width = parseInt(choosenRef.current.style.width) + transfrormX * item[0] + 'px'
                                choosenRef.current.style.height = parseInt(choosenRef.current.style.height) + transfrormY * item[1] + 'px'

                                setChoosenWidth(parseInt( choosenRef.current.style.width));
                                setChoosenHeight(parseInt(choosenRef.current.style.height));
                            }
                        }}

                        onMouseUp={(e) => {
                            document.onmousemove = null;
                        }}

                    />
                )
            ) : ''}
        </div>
    )
}