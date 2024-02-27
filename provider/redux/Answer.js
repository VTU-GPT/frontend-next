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
                    notebookId : action.payload.notebookId,
                    question : action.payload.question,
                    answer : action.payload.answer,
                    sources : []
                })
            }
            state.content[state.content.length-1].answer = action.payload.answer;
            state.content[state.content.length-1].sources = action.payload.sources;  
        },
        showAnswer(state,action){
            state.content.push({
                notebookId : action.payload.notebookId,
                id : action.payload.id,
                question : action.payload.question,
                answer : action.payload.answer,
                sources : action.payload.sources
            })
        }
    }
})

export const {addAnswer,showAnswer} = QuestionAnswerJson.actions

