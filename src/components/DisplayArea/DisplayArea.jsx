import React, {useEffect, useRef, useState} from "react";
import './DisplayArea.css'
import {useSelector} from 'react-redux'

import SizingBox from './compoments/SizingBox'
import TextRedactor from "./compoments/TextRedactor";

export default function DisplayArea() {

    //хранилища
    const imageSelector = useSelector((state) => state.data.image);

    const [images, setImages] = React.useState([]);
    React.useEffect(
        () => {
            // console.log(imageSelector)
            if (imageSelector != null) {
                let c = {}
                for (let key in imageSelector) {
                    c[key] = imageSelector[key];
                }
                setImages(images.concat(c))
            }
        }, [imageSelector]
    )

    const textSelector = useSelector((state) => state.data.text);

    //Приём текста
    const [texts, setTexts] = React.useState([]);

    React.useEffect(
        () => {
            if (textSelector != null) {
                let c = {}
                for (let key in textSelector) {
                    c[key] = textSelector[key];
                }
                setTexts(texts.concat(c))

                setChoosen(texts.length);
                setChoosenType('text')
                setShowTextInput(true)

            }
        }, [textSelector]
    )

    //Задний фон
    const backgroundHeight = useSelector((state) => state.data.backgroundHeight)
    const backgroundWidth = useSelector((state) => state.data.backgroundWidth);
    const backgroundImg = useSelector((state) => state.data.backgroundImg);

    const backgroundRef = React.useRef(null);
    useEffect(() => {
        if (backgroundRef != null && backgroundImg != '') {
            backgroundRef.current.style.background = 'url(' + backgroundImg + ')';
            backgroundRef.current.style.backgroundSize = '100% 100%';
        } else
            backgroundRef.current.style.background = 'white';

    }, [backgroundImg])

    //Абсолютная позиция картинки на документе
    let bodyWidth = document.documentElement.clientWidth;
    let bodyHeight = document.documentElement.clientHeight;

    let backgroundLeft = (bodyWidth * 0.8) / 2 + bodyWidth * 0.2;
    let backgroundTop = bodyHeight * 0.5;

    // адаптиция маштабирования
    const [windowScale, setWindowScale] = React.useState(1);

    window.onload = () => {
        setWindowScale(1 / window.devicePixelRatio.toFixed(2));
    };
    window.onresize = () => {
        setWindowScale(1 / window.devicePixelRatio.toFixed(2));
        setShowSizeBox(false)
        bodyWidth = document.documentElement.clientWidth;
        bodyHeight = document.documentElement.clientHeight;

        backgroundLeft = (bodyWidth * 0.8) / 2 + bodyWidth * 0.2;
        backgroundTop = bodyHeight * 0.5;
        backgroundRef.current.style.left = backgroundLeft + 'px';
        backgroundRef.current.style.top = backgroundTop + 'px';
    }

    //Указатеои на выбранный елемент
    const [choosen, setChoosen] = React.useState(-1);
    const [chosenType, setChoosenType] = React.useState('');
    const choosenRef = useRef();



    //Рамка изменения размера
    const [showSizeBox, setShowSizeBox] = useState(false);

    // редактор текста
    const [showTextInput, setShowTextInput] = useState(false);

    //Елемент удеживается
    const [asserted,setAsserted] = React.useState(false);

    const [mousePos, setMousePos] = React.useState(0);
    return (
        <div className='displayArea'
             onClick={() => {
                 setShowSizeBox(false);
             }}
             onMouseUp={() => {
                 document.onmousemove = null;
             }}
        >

            <div className="background" id='save' ref={backgroundRef}

                 style={{
                     'height': backgroundHeight + 'px',
                     'width': backgroundWidth + 'px',

                     'left': backgroundLeft + 'px',
                     'top': backgroundTop + 'px',
                 }}

            >
                {images.map((item, index) =>

                    <img src={item.str} key={item.id}
                         className={['translable', 'image'].join(' ')}
                         ref={(index == choosen && chosenType == 'image') ? choosenRef : null}

                         style={{
                             'height': item.height + 'px',
                             'width': item.width + 'px',

                             'left': backgroundWidth / 2 + 'px',
                             'top': backgroundHeight / 2 + 'px',

                         }}
                         onMouseDown={(e) => {
                             setAsserted(true)
                             setChoosen(index);
                             setChoosenType('image');

                             setShowSizeBox(false);
                             setMousePos([e.clientX, e.clientY])
                             document.onmousemove = function (ev) {
                                 e.target.style.left = parseInt(e.target.style.left) + ev.movementX * windowScale + 'px';
                                 e.target.style.top = parseInt(e.target.style.top) + ev.movementY * windowScale + 'px';
                             }
                         }}
                         onMouseUp={(e) => {
                             setAsserted(false)
                             if (mousePos[0] == e.clientX && mousePos[1] == e.clientY) {
                                 setShowSizeBox(true);
                             }
                             document.onmousemove = null;
                         }}
                         onClick={(e) => {
                             e.stopPropagation();
                         }}
                    />
                )}
                {/*{backgroundRef.current && console.log(backgroundRef.current.childNodes[0])}*/}
                {texts.map((item, index) =>

                    <div key={item.id}
                         className={['translable', 'text'].join(' ')}
                         ref={(index == choosen && chosenType == 'text') ? choosenRef : null}

                         style={{
                             'height': item.height + 'px',
                             'width': item.width + 'px',

                             'left': backgroundWidth / 2 + 'px',
                             'top': backgroundHeight / 2 + 'px',
                             'color':item.color,

                         }}
                         onDoubleClick={() => {
                             setChoosen(index);
                             setChoosenType('text');

                             setShowTextInput(true)
                         }}
                         onMouseDown={(e) => {
                             setAsserted(true)
                             setShowSizeBox(false);
                             setChoosen(index);
                             setChoosenType('text');

                             document.onmousemove = function (ev) {
                                 e.target.style.left = parseInt(e.target.style.left) + ev.movementX * windowScale + 'px';
                                 e.target.style.top = parseInt(e.target.style.top) + ev.movementY * windowScale + 'px';
                             }
                         }}
                         onClick={(e) => {
                             e.stopPropagation();
                         }}
                         onMouseUp={() => {
                             setAsserted(false)
                             document.onmousemove = null;
                             setShowSizeBox(true);
                         }}
                    >
                        {item.str}
                    </div>
                )}
                {showSizeBox == true && <SizingBox itemRef={choosenRef}/>}

            </div>
            {showTextInput == true && <TextRedactor
                getTextFromElement={() => {
                    return texts[choosen].str
                }}
                setTextInElement={(text) => {
                    texts[choosen].str = text
                    let fs = 64;
                    choosenRef.current.style.fontSize = fs + 'px'
                    choosenRef.current.style.height = (text.split('\n').length + 1) * fs +'px'

                    let maxLine = Math.max(...text.split('\n').map((line)=>line.length));
                    console.log(maxLine)
                    choosenRef.current.style.width = maxLine *fs*0.8+'px';

                }
                }
                remove={() => texts.splice(choosen, 1)}
                close={() => setShowTextInput(false)}

            />}

            {asserted == true &&
                <div className='trash'
                     onMouseUp={() => {
                         if (chosenType == 'image') {
                             images.splice(choosen, 1)
                             setAsserted(false)
                             setChoosen(-1);
                         } else if (chosenType == 'text') {
                             texts.splice(choosen, 1)
                             setAsserted(false)
                             setChoosen(-1);
                         }
                     }
                     }
                >
                    Удалить
                </div>
            }
        </div>
    )
}