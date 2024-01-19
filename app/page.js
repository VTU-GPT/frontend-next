"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { InputHome } from '@/components/InputHome';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast()
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
    <main style={{overflowY:'scroll'}}>
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
        {answer && (
          <p style={{ width: '50%', margin: '0 auto',whiteSpace: 'pre-wrap'}}>{answer.content}</p>
        )}
      </>
    ) : (
      <InputHome onAsk={handleAsk} />
    )}
    <div className="homepage-footer">
      <Link href="">Try Pro</Link>
      <Link href="">Careers</Link>
      <Link href="">Playground</Link>
      <Link href="">Blog</Link>
    </div>
    <div className="help-btn">
      <i className="ri-question-fill"></i>
    </div>
  </main>
  );
};

export default Home;
