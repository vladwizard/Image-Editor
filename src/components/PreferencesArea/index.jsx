import React from "react";
import style from './PreferencesArea.css'
import s from '../../assets/background.png'
import {useSelector, useDispatch} from 'react-redux'
import {setText, setImage, setBackgroundImage,setBackgroundSize} from '../../Redux/slices/imagesDataSlice'

export default function PreferencesArea() {

    const backgroundHeight = useSelector((state) => state.imagesData.backgroundHeight)
    const backgroundWidth = useSelector((state) => state.imagesData.backgroundWidth);

    const images = useSelector((state) => state.imagesData.items);
    const dispatch = useDispatch()



    const [imageURl, setImageURL] = React.useState('');

    const [fileInput, setFileInput] = React.useState(null);
    React.useEffect(() => {
            // dispatch(setImage(['https://sun9-west.userapi.com/sun9-39/s/v1/if2/WnaUDudfVL5N3TEanMqOQ926BhEkeL8OmztoAl-y0uLxhWIyKxO-GEEq1WjB40ZMFAOwPIQvtVno5yorRc0lCw8_.jpg?size=750x478&quality=96&type=album', 400, 400]))
            //dispatch(setText('123123123123213'));
        }, []
    )
    const [insertText, setInsertText] = React.useState('');

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
            // preview.src = reader.result;

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

    const [proportion,setProportion]=React.useState(false);
    return (
        <div className='preferencesArea'>
            <div className='sizeBackground'>
                <label>Высота</label> <input type='text' value={backgroundHeight}
                                             onChange={(e) => {
                                                 let height = e.target.value;
                                                 if(proportion == true) dispatch(setBackgroundSize([Math.round(height/backgroundHeight) * backgroundWidth,height ]))
                                                 else dispatch(setBackgroundSize([backgroundWidth, height]))
                                             }}/>
            </div>
            <div className='sizeBackground'>
                <label>Ширина</label> <input type='text' value={backgroundWidth}
                                             onChange={(e) => {
                                                 let width = e.target.value;
                                                 if(proportion == true) dispatch(setBackgroundSize([width,Math.round(width/backgroundWidth) * backgroundHeight ]))
                                                 else dispatch(setBackgroundSize([width, backgroundHeight]))
                                             }}/>
            </div>
            <div>
                <label>Сохранять пропорции</label>
                <input type='checkbox' value={proportion} onChange={(e)=>setProportion(e.target.value)}/>
            </div>

            <div>
                <button
                onClick={(e)=>{
                    dispatch(setBackgroundImage(null));
                    backgroundInputRef.current.value = null;
                }}
                > Убрать фон</button>

            </div>
            <div>
                <label>Вставить фон файлом</label>
                <input type="file" onChange={inputBackground} ref={backgroundInputRef}>

                </input>
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
                        // console.log(img.src);
                        dispatch(setImage([imageURl, this.width, this.height]));
                    }

                }}>Отправить
                </button>
            </div>
            <div>
                <label>Вставить файлом</label>
                <input type="file" onChange={SetImage} ref={imgInputRef}></input>
            </div>
            <div>

                <button onClick={() => {
                    // dispatch(setText(insertText));
                    dispatch(setText('Текст текст'));
                }}>Вставить текст
                </button>
                {/*<input value={insertText} onChange={(e) => setInsertText(e.target.value)} width='80%'/>*/}
            </div>


        </div>
    )
}