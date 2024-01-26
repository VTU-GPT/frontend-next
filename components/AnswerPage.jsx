'use client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { addAnswer } from '@/provider/redux/Answer';
import { handleAsk } from '@/utils/handleAsk.js'
import { useState } from 'react';
import Source from '@/components/ui/Sources';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AnswerPage = () => {
    const [notebookName, setNotebookName] = useState("New Notebook")
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
            <div className="answer-container">
                <div className="answer-submenu-container">
                    <i class="ri-booklet-fill"></i>
                    <div className='submenu-div'>
                        <div className="notebook-name-box">
                            <Textarea className='resize-none' value={notebookName} onChange={(e)=> setNotebookName(e.target.value)}
                            />
                        </div>
                        <div className='submenu-links-div'>
                            <DropdownMenu className='dropdown-menu'>
                                <DropdownMenuTrigger>File</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>New</DropdownMenuItem>
                                    <DropdownMenuItem>Open</DropdownMenuItem>
                                    <DropdownMenuItem>Make a copy</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger>Share</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Save as pdf</DropdownMenuItem>
                                    <DropdownMenuItem>Share Link</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <div className='answer-box'>
                    <div>
                        {
                            answerList.map((el, index) => (
                                <>
                                    <h3 key={index} className='question'>{(index + 1) + ".  " + el.question}</h3>
                                    <div className='subanswer-div'>
                                        <h1><i class="ri-question-answer-fill"></i>  Answer</h1>
                                        <p key={index} className='answer' style={{ whiteSpace: 'break-spaces' }}>{el.answer}</p>
                                    </div>
                                    <div className="source-container">
                                        <h1><i class="ri-database-fill"></i> Sources</h1>
                                        <div><Source />
                                            <Source />
                                            <Source />
                                            <Source />
                                            <Source /></div>
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
            </div>
        </>


    )
}

export default AnswerPage