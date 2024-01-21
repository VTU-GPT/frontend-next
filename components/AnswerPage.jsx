'use client';
import React from 'react'
import { useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"

const AnswerPage = () => {
    const answerList = useSelector((store) => store.qna.content)
    console.log(answerList)
    return (
        <>
            <div className='answer-box'>
                <div>
                    {
                        answerList.map((el, index) => (
                            <>
                                <h3 className='question'>{(index + 1) + ".  " + el.question}</h3>
                                <p className='answer'>{el.answer}</p>
                            </>
                        ))
                    }
                </div>
                <div className='text-area-div'>
                    <Textarea placeholder='Ask Anything.....' className='resize-none text-area'/>
                    <button className='ask-btn'><i className="ri-arrow-right-line" ></i></button>
                </div>
            </div>

        </>


    )
}

export default AnswerPage