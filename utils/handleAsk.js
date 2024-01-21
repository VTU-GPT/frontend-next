
export const handleAsk = async (question) => {
    const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });
    if (response.ok) {
        const data = await response.json();
        return {
            question : question,
            answer : data.answer.content
        }
    }
    
}










