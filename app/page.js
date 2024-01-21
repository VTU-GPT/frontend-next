"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { InputHome } from '@/components/InputHome';
import { useToast } from "@/components/ui/use-toast"
import AnswerPage from '@/components/AnswerPage';
import { addAnswer } from '@/provider/redux/Answer';
import { useDispatch } from 'react-redux';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast()
  const dispatch = useDispatch()
  const handleAsk = async (question) => {
    setLoading(true);
    try {
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnswer(data.answer);
        dispatch(addAnswer({
          question : question,
          answer : data.answer.content
      })
      )
        setError('');
      } else {
        const data = await response.json();
        setAnswer('');
        setError(data.error || 'Failed to get an answer from OpenAI.');
      }
    } catch (error) {
      console.error(error);
      setAnswer('');
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    {loading && <p>Loading...</p>}
    {answer ? (
      <>
        
        {error && (
          toast({
            title: "Error",
            description: error,
            status: "error",
            duration: 5000,
          })
        )}
        {/* {answer && (
          <AnswerPage Answer={answer.content}/>
        )} */}
      </>
    ) : (
      <InputHome onAsk={handleAsk} />
    )}
    <div className="help-btn">
      <i className="ri-question-fill"></i>
    </div>
    </>
  );
};

export default Home;
