'use client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { addAnswer } from '@/provider/redux/Answer';
import { handleAsk } from '@/utils/handleAsk.js'
import { useState } from 'react';
import Source from '@/components/ui/Sources';

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
                                <div className="source-container">
                                    <h1><i class="ri-database-fill"></i> Sources</h1>
                                    <div><Source />
                                        <Source />
                                        <Source />
                                        <Source />
                                        <Source /></div>
                                </div>
                                <div className='subanswer-div'>
                                    <h1><i class="ri-question-answer-fill"></i>  Answer</h1>
                                    <p key={index} className='answer' style={{ whiteSpace: 'break-spaces' }}>{el.answer}</p>
                                </div>
                            </>
                        ))
                    }
                </div>
                <div className='text-area-div'>
                    <Textarea placeholder='Ask Follow Up....' className='resize-none text-area'
                        value={question}
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
        </>


    )
}

export default AnswerPage