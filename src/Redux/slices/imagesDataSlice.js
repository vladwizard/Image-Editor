import {createSlice} from '@reduxjs/toolkit'

const ImageData = (url, width, height, posX = 0, posY = 0) => {
    return ({
        url,
        width,
        height,
        posX,
        posY
    })
}

const initialState = {
    backgroundHeight: 500,
    backgroundWidth: 700,
    items: [],
    overflowHiden: false,
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

            state.items.push(new ImageData(action.payload[0], width, height));
        },
        setBackground: (state, action) => {
            state.backgroundHeight = action.payload[0];
            state.backgroundWidth = action.payload[1];
        }
    },
})


export const {setImage, setBackground} = imagesDataSlice.actions

export default imagesDataSlice.reducer