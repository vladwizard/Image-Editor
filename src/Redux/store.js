import { configureStore } from '@reduxjs/toolkit'
import imagesDataSlice from './slices/imagesDataSlice'

export const store = configureStore({
    reducer: {
        imagesData: imagesDataSlice,
    },
})