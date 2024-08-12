import {configureStore} from '@reduxjs/toolkit'
import newtaskReducers from '../NewTask/Partials/NewTaskSlice'

export const store = configureStore({
    reducer : {
        newtask : newtaskReducers

    }
})