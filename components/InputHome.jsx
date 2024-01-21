import React, { useState } from 'react';
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Textarea } from "@/components/ui/textarea"


  const InputHome = ({ onAsk }) => {
  const [question, setQuestion] = useState('');

  const handleAsk = () => {
    if (question.trim() === '') {
      // Don't allow empty questions
      return;
    }

    // Call the onAsk prop, passing the question to the parent component (Home)
    onAsk(question);
  }
    return (
      <>
      <div className='homepage-main'>
        <h1>Where Knowledge begins</h1>
        <div className='text-area-div'>
        <Textarea placeholder='Ask Anything.....' className='resize-none text-area'
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className='ask-btn' onClick={handleAsk}><i className="ri-arrow-right-line" ></i></button>
        </div>
        <div className='homepage-suggestions'>
          <p>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-right-to-arc" className="svg-inline--fa fa-arrow-right-to-arc icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 256c0-114.9-93.1-208-208-208c-13.3 0-24-10.7-24-24s10.7-24 24-24C397.4 0 512 114.6 512 256s-114.6 256-256 256c-13.3 0-24-10.7-24-24s10.7-24 24-24c114.9 0 208-93.1 208-208zM232.3 134.4l112 104c4.9 4.5 7.7 10.9 7.7 17.6s-2.8 13-7.7 17.6l-112 104c-9.7 9-24.9 8.5-33.9-1.3s-8.5-24.9 1.3-33.9L266.9 280H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H266.9l-67.2-62.4c-9.7-9-10.3-24.2-1.3-33.9s24.2-10.3 33.9-1.3z"></path>
            </svg>
            Try asking
          </p>
          <Link href='/'>🪝 The best fishing spots in Canada</Link>
          <Link href='/'>🪆 The history of matryoshka dolls</Link>
          <Link href='/'>🪶 Why do we stuff pillows with feathers?</Link>
          <Link href='/'>🪡 The best ateliers in Paris</Link>
        </div>
      </div>
      <div className="homepage-footer">
      <Link href="">Try Pro</Link>
      <Link href="">Careers</Link>
      <Link href="">Playground</Link>
      <Link href="">Blog</Link>
    </div>
      </>
    
      
  )
}

export {InputHome};