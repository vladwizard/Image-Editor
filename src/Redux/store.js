import { configureStore } from '@reduxjs/toolkit'
import displayItemsSlice from './slices/displayItemsSlice'

export const store = configureStore({
    reducer: {
        data: displayItemsSlice,
    },
})