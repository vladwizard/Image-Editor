import React from "react";
import './PreferencesArea.css'
import {useSelector, useDispatch} from 'react-redux'
import {setText, setImage, setBackgroundImage, setBackgroundSize} from '../../Redux/slices/displayItemsSlice'
import domtoimage from 'dom-to-image';
import {saveAs} from 'file-saver';

export default function PreferencesArea() {
    const dispatch = useDispatch()

    const backgroundHeight = useSelector((state) => state.data.backgroundHeight)
    const backgroundWidth = useSelector((state) => state.data.backgroundWidth);

    const backgroundInputRef = React.createRef();

    function inputBackground() {
        let file = backgroundInputRef.current.files[0];
        let reader = new FileReader();

        reader.onloadend = function () {

            let img = new Image();
            img.src = reader.result;
            img.onload = function () {
                dispatch(setBackgroundImage(reader.result));
                dispatch(setBackgroundSize([this.width, this.height]));
                setProportion(true)
            }
        }

        if (file) {
            reader.readAsDataURL(file);
        }

    }

    const imgInputRef = React.createRef();

    function SetImage() {
        let file = imgInputRef.current.files[0];
        let reader = new FileReader();

        reader.onloadend = function () {
            let img = new Image();
            img.src = reader.result;
            img.onload = function () {
                dispatch(setImage([reader.result, this.width, this.height]));
            }
        }

        if (file) {
            reader.readAsDataURL(file);
        }

    }

    const [imageURl, setImageURL] = React.useState('');
    const [proportion, setProportion] = React.useState(false);
    const [color, setColor] = React.useState('#000000');

    return (
        <div className='preferencesArea'>
            <div className='double_fr'>
                <label>Высота</label> <input type='text' value={Math.round(backgroundHeight)}
                                             onChange={(e) => {
                                                 let height = e.target.value;
                                                 if (proportion == true) dispatch(setBackgroundSize([(height / backgroundHeight) * backgroundWidth, height]))
                                                 else dispatch(setBackgroundSize([backgroundWidth, height]))
                                             }}/>
            </div>
            <div className='double_fr'>
                <label>Ширина</label> <input type='text' value={Math.round(backgroundWidth)}
                                             onChange={(e) => {
                                                 let width = e.target.value;
                                                 if (proportion == true) dispatch(setBackgroundSize([width, (width / backgroundWidth) * backgroundHeight]))
                                                 else dispatch(setBackgroundSize([width, backgroundHeight]))
                                             }}/>
            </div>
            <div >
                <input className="custom-checkbox" type='checkbox' id="happy" checked={proportion} onChange={(e) => {
                    setProportion(e.target.checked);
                }}/>
                <label htmlFor="happy" >Сохранять пропорции</label>
            </div>

            <div>
                <button
                    onClick={(e) => {
                        dispatch(setBackgroundImage(null));
                        backgroundInputRef.current.value = null;
                    }}
                > Убрать фон
                </button>

            </div>
            <div>
                <label className='file_load' htmlFor="background_uploads">Вставить фон файлом </label>
                <input className='file_input' type="file" onChange={inputBackground} id="background_uploads"
                       accept=".jpg, .jpeg, .png" ref={backgroundInputRef}/>
            </div>
            <div>
                <label className='file_load' htmlFor="image_uploads">Вставить картинку файлом</label>
                <input className='file_input' type="file" onChange={SetImage} id="image_uploads"
                       accept=".jpg, .jpeg, .png" ref={imgInputRef}/>
            </div>

            <div className='urlArea'>
                <label>Вставить ссылкой</label>
                <textarea id="story" name="story" rows="7"
                          value={imageURl}
                          onChange={(e) => {
                              setImageURL(e.target.value);
                          }}/>
                <button onClick={() => {
                    let img = new Image();
                    img.src = imageURl;
                    img.onload = function () {
                        dispatch(setImage([imageURl, this.width, this.height]));
                    }
                }}>
                    Отправить
                </button>
            </div>

            <div className='double_fr'>
                <button onClick={() => {
                    dispatch(setText(color));
                }}>Вставить текст
                </button>
                <p>Цвет: <input type="color" name="bg" value={color} onChange={(e) => setColor(e.target.value)}/></p>
            </div>

            <button className='save_button'
                    onClick={() => {
                        let node = document.getElementById('save');
                        node.style.position = 'static';
                        node.style.transform = 'translate(0,0)'

                        domtoimage.toBlob(node)
                            .then(function (blob) {
                                window.saveAs(blob, 'goodPng.png');
                            });
                        setTimeout(() => {
                            node.style.position = 'absolute';
                            node.style.transform = 'translate(-50%,-50%)'
                        }, 500)

                    }}
            >Сохранить
            </button>
        </div>
    )
}