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

    // let posButtonSwitch = false;
    // let startposChoosen = [100, 100];
    // const test = (e) => {
    //     e.target.style.top = 100 + 'px'
    // };

    let bodyWidth = document.documentElement.clientWidth;
    let bodyHeight = document.documentElement.clientHeight;
// console.log(document.getElementsByClassName('displayArea')[0]);
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
        // console.log(bodyWidth);
    }
    // const [startBackgroundWidth, setStartBackgroundWidth] = React.useState(0);
    // const [startBackgroundHeight, setStartBackgroundHeight] = React.useState(0);
    // React.useEffect(() => {
    //         setStartBackgroundWidth(backgroundWidth);
    //         setStartBackgroundHeight(backgroundHeight);
    //     }
    //     , []
    // )
    //
    // let choosenSizes = [0, 0];
    // let transfrom = [0, 0];
    // let poses = {
    //     posButtonRef: React.useRef(null),
    //     choosenRef: React.useRef(null),
    //     rangeRef: React.useRef(null),
    //
    //     startChoosen: [0, 0],
    //
    //     // setStart: function () {
    //     //
    //     //     let startPosButton = [parseInt(this.choosenRef.current.style.width) + 10, + parseInt(this.choosenRef.current.style.height) / 2 - 20];
    //     //     let startRange = [- parseInt(this.choosenRef.current.style.width)/2+parseInt(this.rangeRef.current.style.width)/2 -20,parseInt(this.choosenRef.current.style.height)/2 + parseInt(this.rangeRef.current.style.height) / 2 - 20];
    //     //
    //     //     let centerMove = [ - this.startChoosen[0] - parseInt(this.choosenRef.current.style.width) / 2, - this.startChoosen[1] - parseInt(this.choosenRef.current.style.height) / 2];
    //     //     this.choosenRef.current.style.left = centerMove[0] + 'px';
    //     //     this.choosenRef.current.style.top = centerMove[1] + 'px';
    //     //
    //     //     this.posButtonRef.current.style.left = centerMove[0] + startPosButton[0] + 'px';
    //     //     this.posButtonRef.current.style.top = centerMove[1] + startPosButton[1] + 'px';
    //     //
    //     //     this.rangeRef.current.style.left = centerMove[0] + startRange[0] + 'px';
    //     //     this.rangeRef.current.style.top = centerMove[1] + startRange[1] + 'px';
    //     //
    //     // },
    //     // setMove: function (e, props) {
    //     //     let startPosButton = [parseInt(this.choosenRef.current.style.width) + 10, +parseInt(this.choosenRef.current.style.height) / 2 - 20];
    //     //     let startRange = [-parseInt(this.choosenRef.current.style.width) / 2 + parseInt(this.rangeRef.current.style.width) / 2 - 20, parseInt(this.choosenRef.current.style.height) / 2 - parseInt(this.rangeRef.current.style.height) / 2];
    //     //
    //     //     let centerMove = [props[0] + e.pageX - backgroundLeft - this.startChoosen[0] - parseInt(this.choosenRef.current.style.width) / 2, props[1] + e.pageY - backgroundTop - this.startChoosen[1] - parseInt(this.choosenRef.current.style.height) / 2];
    //     //     this.choosenRef.current.style.left = centerMove[0] + 'px';
    //     //     this.choosenRef.current.style.top = centerMove[1] + 'px';
    //     //
    //     //     this.posButtonRef.current.style.left = centerMove[0] + startPosButton[0] + 'px';
    //     //     this.posButtonRef.current.style.top = centerMove[1] + startPosButton[1] + 'px';
    //     //
    //     //     this.rangeRef.current.style.left = centerMove[0] + startRange[0] + 'px';
    //     //     this.rangeRef.current.style.top = centerMove[1] + startRange[1] + 'px';
    //     //
    //     // }
    //
    // };
    const [showPreferens, setShowPreferens] = useState(false);
    const [holden, setHolden] = React.useState(-1);
    const [rangeValue, setRangeValue] = React.useState(1);
    const choosenRef = useRef();
    const rangeRef = useRef();
    let containerRef = React.useRef();

    function setPosRange() {
        // rangeRef.current.style.left = parseInt(containerRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(containerRef.current.style.width) / 2 - parseInt(backgroundRef.current.style.width) / 2 - 100 + 'px';
        // rangeRef.current.style.top = parseInt(containerRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + 'px';

        rangeRef.current.style.left = 0 + 'px';
        rangeRef.current.style.top = 0 + 'px';
    }

    // useEffect(() => {
    //     if (rangeRef.current) {
    //         rangeRef.current.style.left = parseInt(containerRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(containerRef.current.style.width) / 2 - parseInt(backgroundRef.current.style.width) / 2 - 100 + 'px';
    //         rangeRef.current.style.top = parseInt(containerRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + 'px';
    //     }
    // }, [showPreferens])
    // const containerRefs = images.map(()=>React.useRef());
    // const imageRefs = [];
    // // if (containerRefs.length == 0) {
    // //     for (let i = 0; i < images.length; i++) {
    // //
    // //         containerRefs[i] =
    // //         imageRefs[i] = React.useRef();
    // //     }
    // // }
    // console.log(containerRefs)

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
                    <div className='container' key={index} ref={index==choosen?containerRef:null}
                         style={{
                             'left': backgroundWidth / 2 + 'px',
                             'top': backgroundHeight / 2 + 'px',
                             'height': item.height + 'px',
                             'width': item.width + 'px',
                         }}
                    >
                        <img src={item.url} className={`image ${index == holden ? 'active' : ""}`} ref={index==choosen?choosenRef:null}

                             style={{
                                 'height': item.height + 'px',
                                 'width': item.width + 'px',
                                 'left': item.width / 2 + 'px',
                                 'top': item.height / 2 + 'px',
                             }}
                             onMouseDown={(e) => {
                                 console.log(e.target.parentElement)
                                 setShowPreferens(false);

                                 setChoosen(index);
                                 setHolden(index);

                                 document.onmousemove = function (ev) {

                                     containerRef.current.style.left = ev.pageX - parseInt(backgroundRef.current.style.left) + parseInt(backgroundRef.current.style.width) / 2 + 'px';
                                     containerRef.current.style.top = ev.pageY - parseInt(backgroundRef.current.style.top) + parseInt(backgroundRef.current.style.height) / 2 + 'px';

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

                    </div>
                )}

            </div>
            {showPreferens ? (

                <input type='range' className='input_range' ref={rangeRef} min={0.1} max={2} step={0.02}
                       value={rangeValue}
                       style={{
                           'height': '30px',
                           'width': '150px',
                           // 'left': parseInt(containerRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(containerRef.current.style.width) / 2 - parseInt(backgroundRef.current.style.width) / 2 - 100 + 'px',
                           // 'top': parseInt(containerRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + 'px',
                           'left': parseInt(containerRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(backgroundRef.current.style.width) / 2 - 75 + 'px',
                           'top': parseInt(containerRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2-15 + 'px',
                       }}

                       onClick={(e) => {
                           // console.log("я третий")
                           e.stopPropagation();
                       }}
                       onChange={(e) => {

                           setRangeValue(e.target.value);
                           choosenRef.current.style.width = images[choosen].width * e.target.value + 'px';
                           choosenRef.current.style.height = images[choosen].height * e.target.value + 'px';
                           // containerRef.current.style.width = images[choosen].width * e.target.value + 'px';
                           // containerRef.current.style.height = images[choosen].height * e.target.value + 'px';
                       }}
                />
            ) : ''}
        </div>
    )
}