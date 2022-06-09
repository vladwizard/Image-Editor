import React, {useEffect, useRef, useState} from "react";
import './DisplayArea.css'
import {useSelector, useDispatch} from 'react-redux'

export default function DisplayArea() {

    //хранилища
    const imageSelector = useSelector((state) => state.data.image);
    const [images, setImages] = React.useState([]);
    React.useEffect(
        () => {
            console.log(imageSelector)
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
                setShowTextInput(true);
                setTextInput('');

            }
        }, [textSelector]
    )

    //Задний фон
    const backgroundHeight = useSelector((state) => state.data.backgroundHeight)
    const backgroundWidth = useSelector((state) => state.data.backgroundWidth);
    const backgroundImg = useSelector((state) => state.data.backgroundImg);

    const backgroundRef = React.useRef(null);
    useEffect(() => {
        if (backgroundImg != 0 && backgroundImg != null) {
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

    const [asserted, setAsserted] = React.useState(-1);

    //необходимы для отрисовки boxSizing
    const [choosenWidth, setChoosenWidth] = React.useState(0);
    const [choosenHeight, setChoosenHeight] = React.useState(0);

    const buttonSize = 50;
    const [showSizeBox, setShowSizeBox] = useState(false);

    // редактор текста
    const [textInput, setTextInput] = React.useState('');
    const [showTextInput, setShowTextInput] = useState(false);
    const inputTextRef = React.useRef();

    //автофокус при добавлении текста
    useEffect(() => {
        if (inputTextRef.current != null && textInput == '')
            inputTextRef.current.focus();
    }, [showTextInput])

    return (
        <div className='displayArea'
             onClick={() => {
                 setShowSizeBox(false);
             }
             }
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
                         className={`image ${((index) == asserted && chosenType == 'text') ? 'holding' : ""}`}
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
                )}

                {texts.map((item, index) =>

                    <div key={item.id}
                         className={`text${index} ${(index == asserted && chosenType == 'text') ? 'active' : ""}`}
                         ref={(index == choosen && chosenType == 'text') ? choosenRef : null}

                         style={{
                             'color': item.color,
                             'transform': 'translate(-50%,-50%)',
                             'height': item.height + 'px',
                             'width': item.width + 'px',
                             'minHeight': 30 + 'px',
                             'minWidth': 80 + 'px',
                             'left': backgroundWidth / 2 + 'px',
                             'top': backgroundHeight / 2 + 'px',


                         }}
                         onDoubleClick={() => {
                             setTextInput(item.str);
                             setShowTextInput(true)
                         }}
                         onMouseDown={(e) => {
                             setShowSizeBox(false);
                             setChoosen(index);
                             setChoosenType('text');
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
                    >
                        {item.str}
                    </div>
                )}
            </div>
            {showSizeBox == true ? (

                [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]].map((item) =>
                    <button
                        style={(Math.abs(item[0]) == 1 && Math.abs(item[1]) == 1) ?
                            {
                                'width': buttonSize + 12 + 'px',
                                'height': buttonSize + 12 + 'px',

                                'left': parseInt(choosenRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(backgroundRef.current.style.width) / 2 + (choosenWidth / 2 + buttonSize / 2 + 5) * item[0] + 'px',
                                'top': parseInt(choosenRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + (choosenHeight / 2 + buttonSize / 2 + 5) * item[1] + 'px',
                            }
                            :
                            {
                                'width': buttonSize + (choosenWidth - buttonSize) * Math.abs(item[1]) + 'px',
                                'height': buttonSize + (choosenHeight - buttonSize) * Math.abs(item[0]) + 'px',

                                'left': parseInt(choosenRef.current.style.left) + parseInt(backgroundRef.current.style.left) - parseInt(backgroundRef.current.style.width) / 2 + (choosenWidth / 2 + buttonSize / 2) * item[0] + 'px',
                                'top': parseInt(choosenRef.current.style.top) + parseInt(backgroundRef.current.style.top) - parseInt(backgroundRef.current.style.height) / 2 + (choosenHeight / 2 + buttonSize / 2) * item[1] + 'px',
                            }
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onMouseDown={() => {
                            document.onmousemove = function (ev) {
                                let transfrormX = ev.movementX * 2 * windowScale;
                                let transfrormY = ev.movementY * 2 * windowScale;
                                if (parseInt(choosenRef.current.style.width) > parseInt(choosenRef.current.style.minWidth) || transfrormX * item[0] > 0) {
                                    choosenRef.current.style.width = parseInt(choosenRef.current.style.width) + transfrormX * item[0] + 'px'
                                    setChoosenWidth(parseInt(choosenRef.current.style.width));
                                }

                                if (parseInt(choosenRef.current.style.height) > parseInt(choosenRef.current.style.minHeight) || transfrormY * item[1] > 0) {
                                    choosenRef.current.style.height = parseInt(choosenRef.current.style.height) + transfrormY * item[1] + 'px'
                                    setChoosenHeight(parseInt(choosenRef.current.style.height));
                                }

                                if (chosenType == 'text') {

                                    let fs = 32 * parseInt(choosenRef.current.style.height) / texts[choosen].height;

                                    choosenRef.current.style.fontSize = fs + 'px'

                                    // choosenRef.current.style.minWidth = fs*texts[choosen].str.length/1.5+'px';
                                    // if (parseInt(choosenRef.current.style.width) < parseInt(choosenRef.current.style.minWidth)){
                                    //     console.log(choosenRef.current.style.minWidth)
                                    //    choosenRef.current.style.width = parseInt(choosenRef.current.style.minWidth) + 'px'
                                    // }
                                    // console.log(fs*texts[choosen].str.length);
                                }
                            }
                        }
                        }
                        onMouseUp={() => {
                            document.onmousemove = null;
                        }}

                    />
                )
            ) : ''}
            {showTextInput == true ? (
                <div className="textInput"
                     onClick={() => {
                         setShowTextInput(false);
                         if (textInput == '') {
                             texts.splice(choosen, 1);
                         } else {
                             texts[choosen].str = textInput;
                             texts[choosen].n = textInput.split('\n').length;
                             texts[choosen].width = textInput.length * 20 * parseInt(choosenRef.current.style.height) / texts[choosen].height;
                         }
                     }}
                >
                    <textarea ref={inputTextRef} value={textInput} rows={
                        textInput.length == 0 ? 1 :
                            textInput.split('\n').filter((line) => line.length > 25).length + textInput.split('\n').length
                    }
                              onChange={(e) => setTextInput(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                    />
                </div>
            ) : ''}
            {asserted != -1 ?
                <div className='trash'
                     onMouseUp={() => {
                         if (chosenType == 'img') {
                             images.splice(choosen, 1)
                             setAsserted(-1)
                             setChoosen(-1);
                         } else if (chosenType == 'text') {
                             texts.splice(choosen, 1)
                             setAsserted(-1)
                             setChoosen(-1);
                         }
                     }
                     }
                >
                    Удалить
                </div>
                : ''
            }
        </div>
    )
}