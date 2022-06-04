import React from "react";
import style from './PreferencesArea.css'
import s from '../../assets/background.png'
import {useSelector, useDispatch} from 'react-redux'
import {setImage, setBackground} from '../../Redux/slices/imagesDataSlice'

export default function PreferencesArea() {

    const backgroundHeight = useSelector((state) => state.imagesData.backgroundHeight)
    const backgroundWidth = useSelector((state) => state.imagesData.backgroundWidth);
    const images = useSelector((state) => state.imagesData.items);
    const dispatch = useDispatch()
    const fileInputRef = React.createRef();
    const imgInputRef = React.createRef();

    const [imageURl, setImageURL] = React.useState('');

    const [fileInput, setFileInput] = React.useState(null);
    // React.useEffect(() => {
    //         dispatch(setImage(['https://sun9-west.userapi.com/sun9-39/s/v1/if2/WnaUDudfVL5N3TEanMqOQ926BhEkeL8OmztoAl-y0uLxhWIyKxO-GEEq1WjB40ZMFAOwPIQvtVno5yorRc0lCw8_.jpg?size=750x478&quality=96&type=album', 150, 150]))
    //     }, []
    // )

    function previewFile() {
        // var preview = imgInputRef.current;
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            // preview.src = reader.result;

            let img = new Image();
            img.src = reader.result;
            img.onload = function () {
                // console.log(img.src);
                dispatch(setImage([reader.result, this.width, this.height]));
            }
        }

        if (file) {
            reader.readAsDataURL(file);
        }
        // else {
        //     preview.src = "";
        // }
    }

    return (
        <div className='preferencesArea'>
            <div className='sizeBackground'>
                <label>Высота</label> <input type='text' value={backgroundHeight}
                                             onChange={(e) => dispatch(setBackground([e.target.value, backgroundWidth]))}/>
            </div>
            <div className='sizeBackground'>
                <label>Ширина</label> <input type='text' value={backgroundWidth}
                                             onChange={(e) => dispatch(setBackground([backgroundHeight, e.target.value,]))}/>
            </div>
            <br/>
            <div className='urlArea'>
                <label>Вставить ссылкой</label><br/>
                <textarea id="story" name="story" rows="7"
                          value={imageURl}
                          onChange={(e) => {
                              setImageURL(e.target.value);
                          }}/>
                <button onClick={() => {
                    var reader = new FileReader();

                    let img = new Image();
                    img.src = imageURl;
                    img.onload = function () {
                        // console.log(img.src);
                        dispatch(setImage([imageURl, this.width, this.height]));
                    }

                }}>Отправить
                </button>
            </div>
            <br/>
            <br/>
            <label>Вставить файлом</label><br/>
            <input type="file" onChange={previewFile}></input>
            {/*<br/>*/}
            {/*<img src="" height="200" alt="Image preview..." ref={imgInputRef}/>*/}

            {/*<button onClick={() => {*/}


            {/*    console.log()*/}
            {/*}}>WATCH img*/}
            {/*</button>*/}
            {/*<button onClick={()=>{{console.log(window.URL.createObjectURL(fileInput.current.files[0]),123)}}}>123 </button>*/}


        </div>
    )
}