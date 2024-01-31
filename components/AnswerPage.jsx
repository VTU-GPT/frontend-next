'use client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { addAnswer } from '@/provider/redux/Answer';
import { handleAsk } from '@/utils/handleAsk.js'
import { useState } from 'react';
import ReactLoading from 'react-loading';
import Source from '@/components/ui/Sources';
import Link from 'next/link';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AnswerPage = () => {
    const [notebookName, setNotebookName] = useState("New Notebook")
    const [question, setquestion] = useState("")
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch()
    const scrollTolast = () => {
        const answerBoxEl = document.querySelector('.answer-box');
        answerBoxEl.scrollTop = answerBoxEl.scrollHeight;
    }
    const answerList = useSelector((store) => store.qna.content)
    return (
        <>
            <div className="answer-container">
                <div className="answer-submenu-container">
                    <i className="ri-booklet-fill"></i>
                    <div className='submenu-div'>
                        <div className="notebook-name-box">
                            <Textarea className='resize-none' value={notebookName} onChange={(e)=> setNotebookName(e.target.value)}
                            />
                        </div>
                        <div className='submenu-links-div'>
                            <DropdownMenu className='dropdown-menu'>
                                <DropdownMenuTrigger>File</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>New</DropdownMenuItem>
                                    <DropdownMenuItem>Open</DropdownMenuItem>
                                    <DropdownMenuItem>Make a copy</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger>Share</DropdownMenuTrigger>
                                <DropdownMenuContent>
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
                                    <h3 key={index} className='question' style={{fontWeight:600}}>{(index + 1) + ".  " + el.question}</h3>
                                    <div className='subanswer-div'>
                                        <h1 className='flex gap-2'><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="align-left" className="svg-inline--fa fa-align-left fa-fw w-4 inline" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M24 40C10.7 40 0 50.7 0 64S10.7 88 24 88H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM0 320c0 13.3 10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zM24 424c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"></path></svg><span>Answer</span></h1>
                                        <p key={index} className='answer' style={{ whiteSpace: 'break-spaces' }}>{el.answer.slice(1)}</p>
                                    </div>
                                    <div className="source-container">
                                        <h1 className='flex gap-2'><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="list-timeline" className="svg-inline--fa fa-list-timeline fa-fw w-4 inline" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M219.9 112H400V80H219.9l-16 16 16 16zm-72.6-4.7c-6.2-6.2-6.2-16.4 0-22.6l43.3-43.3c6-6 14.1-9.4 22.6-9.4H416c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H213.3c-8.5 0-16.6-3.4-22.6-9.4l-43.3-43.3zM64 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0 160a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 416a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm187.9 16H400V400H219.9l-16 16 16 16zm-72.6-4.7c-6.2-6.2-6.2-16.4 0-22.6l43.3-43.3c6-6 14.1-9.4 22.6-9.4H416c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H213.3c-8.5 0-16.6-3.4-22.6-9.4l-43.3-43.3zM203.9 256l16 16H464V240H219.9l-16 16zm-13.3 54.6l-43.3-43.3c-6.2-6.2-6.2-16.4 0-22.6l43.3-43.3c6-6 14.1-9.4 22.6-9.4H480c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H213.3c-8.5 0-16.6-3.4-22.6-9.4z"></path></svg><span>Sources</span></h1>
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
                    {loading && <div className='flex justify-center'><ReactLoading type='spin' color='#13343B' height={'50px'} width={'70px'} /></div>}
                    <div className='text-area-div'>
                        <Textarea placeholder='Ask Follow Up....' className='resize-none text-area'
                            value={question}
                            onChange={(e) => {
                                setquestion(e.target.value)
                            }}
                            onKeyDown={async (e) => {
                                if (e.key === "Enter") {
                                    setquestion("")
                                    setLoading(true)
                                    scrollTolast()
                                    e.target.blur();
                                    const resp = await handleAsk(question);
                                    await dispatch(addAnswer(resp))
                                    setLoading(false)
                                    scrollTolast()
                                }
                            }}
                        />
                        <button className='ask-btn'><i className="ri-arrow-right-line"
                            onClick={async (e) => {
                                setquestion("")
                                setLoading(true)
                                scrollTolast()
                                e.target.blur();
                                const resp = await handleAsk(question);
                                await dispatch(addAnswer(resp))
                                setLoading(false)
                                scrollTolast()
                            }} ></i></button>
                    </div>
                </div>
            </div>
        </>


    )
}

export default AnswerPage