

import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import modalReducer from './modalSlice'
import deletemodalReducer from './deletemodalSlice'

const store= configureStore(
    {
        reducer: {
            product: productReducer,
            modal: modalReducer,
            deletemodal: deletemodalReducer
            
        }
    }
)
export default store