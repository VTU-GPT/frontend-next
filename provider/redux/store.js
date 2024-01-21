import {configureStore} from '@reduxjs/toolkit'
import { ChangeColor } from './ColorChange'
import { QuestionAnswerJson } from './Answer'

export const store = configureStore({
    reducer : {
        'ChangeColor' : ChangeColor.reducer,
        'qna' : QuestionAnswerJson.reducer
    }
})