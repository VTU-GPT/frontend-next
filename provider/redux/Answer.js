import { createSlice,nanoid } from "@reduxjs/toolkit";

export const QuestionAnswerJson = createSlice({
    name : "qna",
    initialState : {
        content : []
    },
    reducers : {
        addAnswer(state,action){
            if(action.payload.answer == ''){
                state.content.push({
                    id:nanoid(),
                    question : action.payload.question,
                    answer : action.payload.answer,
                    sources : []
                })
            }
            state.content[state.content.length-1].answer = action.payload.answer;
        }
    }
})

export const {addAnswer} = QuestionAnswerJson.actions

