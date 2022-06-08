import {createSlice} from '@reduxjs/toolkit'

const Data = (str, width, height, posX = 0, posY = 0) => {
    return ({
        str,
        width,
        height,
    })
}
const textData = (color, width, height, fontSize = 32) => {
    return ({
        color,
        width,
        height,
        startWidth: width,
        startHeight: height,
        str:'123',
        FontSize: 32,
        n: 1,

    })
}

let initialState = {
    backgroundHeight: 500,
    backgroundWidth: 700,
    backgroundImg: 0,
    items: [],
    texts: [],
    text: null,
    overflowHiden: false,
    iText: 0,
}


export const imagesDataSlice = createSlice({
    name: 'imagesData',
    initialState,
    reducers: {
        // let img = new Image();
        // img.src = action.payload;
        // img.onload = function() {
        //     alert(this.width + 'x' + this.height);
        // };
        setImage: (state, action) => {
            // let img = new Image();
            // img.src = action.payload[0];
            let width = action.payload[1];
            let height = action.payload[2];

            // let prop = width/height;
            //
            //
            // if(height>width){
            //     height = state.backgroundHeight;
            //     width = height * prop;
            // }
            // else{
            //     width = state.backgroundWidth;
            //     height = width / prop;
            // }
            //
            // console.log(width);
            // console.log(height);

            state.items.push(new Data(action.payload[0], width, height));
        },
        setBackgroundImage: (state, action) => {
            state.backgroundImg = action.payload;
        },

        setBackgroundSize: (state, action) => {
            // let width = action.payload[0]
            // if(width < 1) width = 1;
            state.backgroundWidth =action.payload[0];
            // let height = action.payload[1]
            // if(height < 1) height = 1;
            state.backgroundHeight =action.payload[1];
        },
        setText: (state, action) => {
            let fs = 32;
            let str = action.payload;
            state.text = new textData(str, str.length * fs / 1.5, fs * 2, 0, state.iText++);
        },
        // changeText: (state, action) => {
        //     let str = action.payload[0];
        //     let i = action.payload[1];
        //     console.log(state.texts);
        //    state.texts=[];
        // },
    },
})


export const {setImage, setBackgroundSize, setBackgroundImage, setText, changeText} = imagesDataSlice.actions

export default imagesDataSlice.reducer