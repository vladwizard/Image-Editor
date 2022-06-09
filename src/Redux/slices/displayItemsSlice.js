import {createSlice} from '@reduxjs/toolkit'

const imageData = (str, width, height,id) => {
    return ({
        str,
        width,
        height,
        id,
    })
}
const textData = (color, width, height,id) => {
    return ({
        color,
        width,
        height,
        id,
        startWidth: width,
        startHeight: height,
        str:'',

    })
}

let initialState = {
    backgroundHeight: 720,
    backgroundWidth: 720,
    backgroundImg: 0,
    image: null,
    text: null,
    id:0,
}

export const displayItemsSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setImage: (state, action) => {

            let width = action.payload[1];
            let height = action.payload[2];
            state.image = imageData(action.payload[0], width, height, state.id++);
        },

        setBackgroundImage: (state, action) => {

            state.backgroundImg = action.payload;
        },

        setBackgroundSize: (state, action) => {

            state.backgroundWidth =action.payload[0];
            state.backgroundHeight =action.payload[1];
        },

        setText: (state, action) => {

            let fs = 32;
            let color = action.payload;

            state.text = textData( color, 0, fs * 2, state.id++);
        },
    },
})


export const {setImage, setBackgroundSize, setBackgroundImage, setText} = displayItemsSlice.actions

export default displayItemsSlice.reducer