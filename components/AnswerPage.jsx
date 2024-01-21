'use client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { addAnswer } from '@/provider/redux/Answer';
import { handleAsk } from '@/utils/handleAsk.js'
import { useState } from 'react';

const AnswerPage = () => {
    const [question, setquestion] = useState("")
    const dispatch = useDispatch()
    const scrollTolast = () => {
        const answerBoxEl = document.querySelector('.answer-box');
        answerBoxEl.scrollTop = answerBoxEl.scrollHeight;
    }
    const answerList = useSelector((store) => store.qna.content)
    console.log(answerList)
    return (
        <>
            <div className='answer-box'>
                <div>
                    {
                        answerList.map((el, index) => (
                            <>
                                <h3 key={index} className='question'>{(index + 1) + ".  " + el.question}</h3>
                                <p key={index} className='answer'>{el.answer}</p>
                            </>
                        ))
                    }
                </div>
                <div className='text-area-div'>
                    <Textarea placeholder='Ask Follow Up....' className='resize-none text-area'
                    value ={question}
                        onChange={(e) => {
                            setquestion(e.target.value)
                        }}
                        onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                                const resp = await handleAsk(question);
                                await dispatch(addAnswer(resp))
                                setquestion("")
                                scrollTolast()
                            }
                        }}
                    />
                    <button className='ask-btn'><i className="ri-arrow-right-line"
                        onClick={async () => {
                            const resp = await handleAsk(question);
                            await dispatch(addAnswer(resp))
                            setquestion("")
                            scrollTolast()  
                        }} ></i></button>
                </div>
            </div>
            {/* <button onClick={async function(){
                await dispatch(addAnswer({
                    question : 'who is my classmate?',
                    answer : 'my classmate name is Varun and Vedant'
                })
                )
                scrollTolast()
            }}>Click me</button> */}
        </>


    )
}

export default AnswerPage