import React from "react";
// import background from '../../assets/background.png'
import './DisplayArea.css'
import {useSelector, useDispatch} from 'react-redux'

export default function DisplayArea() {
    const images = useSelector((state) => state.imagesData.items);
    const [choosen, setChoosen] = React.useState(-1);
    const backgroundHeight = useSelector((state) => state.imagesData.backgroundHeight)
    const backgroundWidth = useSelector((state) => state.imagesData.backgroundWidth);
    const backgroundRef = React.useRef(null);

    let posButtonSwitch = false;
    let startposChoosen = [100, 100];
    const test = (e) => {
        e.target.style.top = 100 + 'px'
    };

    let bodyWidth = document.documentElement.clientWidth;
    let bodyHeight = document.documentElement.clientHeight;
    let backgroundLeft = bodyWidth * 0.53;
    let backgroundTop = bodyHeight * 0.5 - 170;

    window.onresize = function () {
        bodyWidth = document.documentElement.clientWidth;
        bodyHeight = document.documentElement.clientHeight;
        backgroundRef.current.style.left = backgroundLeft;
        backgroundRef.current.style.top = backgroundTop;
    }
    const [startBackgroundWidth, setStartBackgroundWidth] = React.useState(0);
    const [startBackgroundHeight, setStartBackgroundHeight] = React.useState(0);
    React.useEffect(() => {
            setStartBackgroundWidth(backgroundWidth);
            setStartBackgroundHeight(backgroundHeight);
        }
        , []
    )

    const posButtonRef = React.useRef(null);
    const choosenRef = React.useRef(null);
    const rangeRef = React.useRef(null);


    return (
        <div className='displayArea'>
            <div className="background" ref={backgroundRef}

                 style={{
                     'height': backgroundHeight + 'px',
                     'width': backgroundWidth + 'px',

                 }}
            >
                {images.map((item, index) =>
                    <div className='container' key={index}
                         style={{
                             'left': (backgroundHeight - startBackgroundHeight) / 2 + 'px',
                             'top': (backgroundWidth - startBackgroundWidth) / 2 + 'px',
                         }}
                    >
                        <img src={item.url} className={`image ${choosen == index ? 'active' : ""}`}
                             ref={choosenRef}

                             onClick={(e) => {

                                 if (choosen == index) {
                                     setChoosen(-1)
                                 } else {
                                     setChoosen(index);
                                 }

                             }}
                             style={{
                                 'height': item.height + 'px',
                                 'width': item.width + 'px',
                                 'top': 0 + 'px',
                                 'left': 0 + 'px',
                             }}

                        />


                    </div>
                )}
                {choosen != -1 ? (
                    <div className='container'
                         style={{
                             'left': (backgroundHeight - startBackgroundHeight) / 2 + 'px',
                             'top': (backgroundWidth - startBackgroundWidth) / 2 + 'px',
                         }}
                    >
                        <button className='pos_button' ref={posButtonRef}
                                style={{
                                    // 'left': parseInt(choosenRef.current.style.width) + 10 + 'px',
                                    // 'top': -parseInt(choosenRef.current.style.width)/2 - 20 + 'px',

                                    'left': parseInt(choosenRef.current.style.left) + parseInt(choosenRef.current.style.width) + 10 + 'px',
                                    'top': parseInt(choosenRef.current.style.top) + parseInt(choosenRef.current.style.height) / 2 - 20 + 'px',
                                    'width': 40 + 'px',
                                    'height': 40 + 'px'
                                }}

                                onClick={
                                    (e) => {
                                        posButtonSwitch = !posButtonSwitch;

                                    }}
                                onMouseMove={(e) => {
                                    if (posButtonSwitch == true) {
                                        console.log(e.target.style.width);
                                        e.target.style.left = e.pageX - backgroundLeft - parseInt(e.target.style.width) + 'px';
                                        e.target.style.top = e.pageY - backgroundTop - parseInt(e.target.style.height) + 'px';

                                        choosenRef.current.style.left = parseInt(e.target.style.left) - parseInt(choosenRef.current.style.width) - 10 + 'px';
                                        choosenRef.current.style.top = parseInt(e.target.style.top) - parseInt(choosenRef.current.style.height) / 2 + 20 + 'px';
                                    }
                                }

                                }>pos
                        </button>
                    </div>
                ) : ''}
                {choosen != -1 ? (
                    <div className='container'
                         style={{
                             'left': (backgroundHeight - startBackgroundHeight) / 2 + 'px',
                             'top': (backgroundWidth - startBackgroundWidth) / 2 + 'px',
                         }}
                    >
                        <input type='range' className='input_range' ref={rangeRef}
                               style={{
                                   'height': '30px',
                                   'width': '150px',
                                   'left': parseInt(choosenRef.current.style.left) - 20 - 75 + 'px',
                                   'top': parseInt(choosenRef.current.style.top) + parseInt(choosenRef.current.style.height) / 2 - 20 + 'px',

                               }}
                        />
                    </div>
                ) : ''}
            </div>

        </div>
    )
}