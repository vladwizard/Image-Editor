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

    let choosenSizes = [0, 0];
    let transfrom = [0, 0];
    let poses = {
        posButtonRef: React.useRef(null),
        choosenRef: React.useRef(null),
        rangeRef: React.useRef(null),

        startChoosen: [0, 0],

        // setStart: function () {
        //
        //     let startPosButton = [parseInt(this.choosenRef.current.style.width) + 10, + parseInt(this.choosenRef.current.style.height) / 2 - 20];
        //     let startRange = [- parseInt(this.choosenRef.current.style.width)/2+parseInt(this.rangeRef.current.style.width)/2 -20,parseInt(this.choosenRef.current.style.height)/2 + parseInt(this.rangeRef.current.style.height) / 2 - 20];
        //
        //     let centerMove = [ - this.startChoosen[0] - parseInt(this.choosenRef.current.style.width) / 2, - this.startChoosen[1] - parseInt(this.choosenRef.current.style.height) / 2];
        //     this.choosenRef.current.style.left = centerMove[0] + 'px';
        //     this.choosenRef.current.style.top = centerMove[1] + 'px';
        //
        //     this.posButtonRef.current.style.left = centerMove[0] + startPosButton[0] + 'px';
        //     this.posButtonRef.current.style.top = centerMove[1] + startPosButton[1] + 'px';
        //
        //     this.rangeRef.current.style.left = centerMove[0] + startRange[0] + 'px';
        //     this.rangeRef.current.style.top = centerMove[1] + startRange[1] + 'px';
        //
        // },
        setMove: function (e, props) {
            let startPosButton = [parseInt(this.choosenRef.current.style.width) + 10, +parseInt(this.choosenRef.current.style.height) / 2 - 20];
            let startRange = [-parseInt(this.choosenRef.current.style.width) / 2 + parseInt(this.rangeRef.current.style.width) / 2 - 20, parseInt(this.choosenRef.current.style.height) / 2 - parseInt(this.rangeRef.current.style.height) / 2];

            let centerMove = [props[0] + e.pageX - backgroundLeft - this.startChoosen[0] - parseInt(this.choosenRef.current.style.width) / 2, props[1] + e.pageY - backgroundTop - this.startChoosen[1] - parseInt(this.choosenRef.current.style.height) / 2];
            this.choosenRef.current.style.left = centerMove[0] + 'px';
            this.choosenRef.current.style.top = centerMove[1] + 'px';

            this.posButtonRef.current.style.left = centerMove[0] + startPosButton[0] + 'px';
            this.posButtonRef.current.style.top = centerMove[1] + startPosButton[1] + 'px';

            this.rangeRef.current.style.left = centerMove[0] + startRange[0] + 'px';
            this.rangeRef.current.style.top = centerMove[1] + startRange[1] + 'px';

        }

    };
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
                             ref={poses.choosenRef}

                             onClick={(e) => {

                                 if (choosen == index) {
                                     setChoosen(-1)
                                 } else {
                                     setChoosen(index);
                                     choosenSizes = [item.height, item.width];
                                     // poses.setStart();
                                 }

                             }}
                             style={{
                                 'height': item.height + 'px',
                                 'width': item.width + 'px',
                                 'left': 0 + 'px',
                                 'top': 0 + 'px',                             }}
                             onMouseMove={(e) => {
                                 if (choosen == index) {

                                 }
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
                        {/*{console.log(poses.choosenRef.current.style.left)}*/}
                        <button className='pos_button' ref={poses.posButtonRef}
                                style={{
                                    'left': parseInt(poses.choosenRef.current.style.left) + parseInt(poses.choosenRef.current.style.width) + 10 + 'px',
                                    'top': parseInt(poses.choosenRef.current.style.top) + parseInt(poses.choosenRef.current.style.height) / 2 - 20 + 'px',

                                    'width': 40 + 'px',
                                    'height': 40 + 'px'
                                }}

                                onClick={
                                    (e) => {
                                        posButtonSwitch = !posButtonSwitch;

                                    }}
                                onMouseMove={(e) => {
                                    if (posButtonSwitch == true) {
                                        poses.setMove(e,[- images[choosen].width/2 -50, -20]);
                                        // e.target.style.left = e.pageX - backgroundLeft - parseInt(e.target.style.width) + 'px';
                                        // e.target.style.top = e.pageY - backgroundTop - parseInt(e.target.style.height) + 'px';
                                        // choosenRef.current.style.left = parseInt(e.target.style.left) - parseInt(choosenRef.current.style.width) - 10 + 'px';
                                        // choosenRef.current.style.top = parseInt(e.target.style.top) - parseInt(choosenRef.current.style.height) / 2 + 20 + 'px';

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

                        <input type='range' className='input_range' ref={poses.rangeRef} min={0} max={100} placeholder={50}
                               style={{
                                   'height': '30px',
                                   'width': '150px',
                                   'left': parseInt(poses.choosenRef.current.style.left) - 20 - 75 + 'px',
                                   'top': parseInt(poses.choosenRef.current.style.top) + parseInt(poses.choosenRef.current.style.height) / 2 - 20 + 'px',
                               }}
                               onChange={(e)=>
                               {
                                   poses.choosenRef.current.style.width = images[choosen].width/50 *e.target.value + 'px'
                                   poses.choosenRef.current.style.height = images[choosen].height/50 *e.target.value + 'px'
                               }}
                        />
                    </div>
                ) : ''}
            </div>

        </div>
    )
}