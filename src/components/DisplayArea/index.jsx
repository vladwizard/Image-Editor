import React from "react";
// import background from '../../assets/background.png'
import './DisplayArea.css'
import {useSelector, useDispatch} from 'react-redux'

export default function DisplayArea() {
    const images = useSelector((state) => state.imagesData.items);
    const [choosen, setChoosen] = React.useState(-1);
    const backgroundHeight = useSelector((state) => state.imagesData.backgroundHeight)
    const backgroundWidth = useSelector((state) => state.imagesData.backgroundWidth);
    const choosenRef = React.useRef(null);

    let posButtonSwitch = false;
    let startposChoosen = [100, 100];
    const test = (e) => {
        e.target.style.top = 100 + 'px'
    };
    const posButtonRef = React.useRef(null);
    const backgroundRef = React.useRef(null);
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
    const [startBackgroundWidth,setStartBackgroundWidth] = React.useState(0);
    const [startBackgroundHeight,setStartBackgroundHeight] = React.useState(0);
    React.useEffect(()=>{
            setStartBackgroundWidth(backgroundWidth);
            setStartBackgroundHeight(backgroundHeight);
        }
        ,[]
    )
    return (
        <div className='displayArea'>
            <div className="background" ref={backgroundRef}
                 onClick={() => {
                     if (choosen != -1) {
                         setChoosen(-1)
                     }
                 }}
                 style={{
                     'height': backgroundHeight + 'px',
                     'width': backgroundWidth + 'px',
                     // 'left': bodyWidth*0.53,
                     // 'top': bodyHeight*0.5-170
                 }}
            >
                {images.map((item, index) =>
                    <div className='container' key={index}
                         style={{
                             'left': (backgroundHeight - startBackgroundHeight)/2 + 'px',
                             'top': (backgroundWidth - startBackgroundWidth)/2 + 'px',
                             // 'left': bodyWidth*0.53,
                             // 'top': bodyHeight*0.5-170
                         }}
                    >
                        <img src={item.url}  className={`image ${choosen == index ? 'active' : ""}`}

                             ref={choosenRef}

                             onClick={(e) => {
                                 // console.log(
                                 //     e.target.style.left, e.target.style.top
                                 // )
                                 if (choosen == index) {
                                     setChoosen(-1)
                                 } else {
                                     setChoosen(index);
                                 }
                                 // console.log(choosen)
                             }}
                             style={{
                                 'height': item.height + 'px',
                                 'width': item.width + 'px',
                                 'top': 0 + 'px',
                             }}
                             onMouseMove={(e) => {
                                 if (choosen == index) {
                                     e.target.style.left = e.pageX - backgroundLeft - item.width / 2 + 'px';
                                     e.target.style.top = e.pageY - backgroundTop - item.height / 2 + 'px';

                                     // console.log(e.target.style.left);
                                     // console.log(item.width );
                                     // console.log(item.height)
                                     // console.log()
                                     // console.log()
                                     // console.log()
                                     // console.log()
                                     // e.target.style.top = e.pageY - 10 + 'px';
                                     // console.log(e.pageX);
                                     //  console.log(e.clientX);
                                     // console.log(backgroundRef.current.style.left);
                                     //  console.log(e.target.style.left);
                                 }
                             }}
                        />
                    </div>
                )}
            </div>
            {/**/}
            {/*{choosenRef.current!=null?*/}
            {/*<button className='pos_button'*/}
            {/*        style={{*/}
            {/*            'left': backgroundWidth / 3 + 'px',*/}
            {/*            'top': 0 + 'px',*/}
            {/*        }}*/}
            {/*        ref={posButtonRef}*/}
            {/*        onClick={*/}
            {/*            (e) => {*/}
            {/*                posButtonSwitch = !posButtonSwitch;*/}
            {/*                // e.target.style.left = choosenRef.current.width/2 +30+'px';*/}
            {/*                // console.log(posButtonSwitch);*/}
            {/*                // console.log(choosenRef.current);*/}
            {/*                // console.log(target)*/}
            {/*            }}*/}
            {/*        onMouseMove={(e) => {*/}
            {/*            if (posButtonSwitch == true) {*/}
            {/*                e.target.style.left = e.pageX - 10 + 'px';*/}
            {/*                e.target.style.top = e.pageY - 10 + 'px';*/}
            {/*                choosenRef.current.style.left = e.pageX - choosenRef.current.width - 20 + 'px';*/}
            {/*                choosenRef.current.style.top = e.pageY - choosenRef.current.height / 2 + 'px';*/}
            {/*            }*/}
            {/*        }*/}

            {/*        }>pos*/}
            {/*</button>*/}


            {/*:''}*/}
            {/*<img src='https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png'/>*/}
        </div>
    )
}