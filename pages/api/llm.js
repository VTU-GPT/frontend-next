// pages/api/llm.js

import OpenAI from "openai";


const anyscale = new OpenAI({
    baseURL: "https://api.endpoints.anyscale.com/v1",
    apiKey: "esecret_u2sbcvxgegri9x31reyagyurgb"
  });
  
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const completion = await anyscale.chat.completions.create({
        model: "Open-Orca/Mistral-7B-OpenOrca",
        messages: [{"role": "system", "content": "You are a professional educational assistant. Get to the answer directly without any introduction about yourself or any extra content that is not necessary."}, 
                   {"role": "user", "content": question}],
        temperature: 0.7
    });

    const theResponse = completion.choices[0].message;
    res.status(200).json({ answer: theResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
