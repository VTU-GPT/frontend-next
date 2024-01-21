'use client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { addAnswer } from '@/provider/redux/Answer';

const AnswerPage = () => {
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
                    <Textarea placeholder='Ask Anything.....' className='resize-none text-area'/>
                    <button className='ask-btn'><i className="ri-arrow-right-line" ></i></button>
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