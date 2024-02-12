// pages/api/llm.js
"use client"
import { CohereEmbeddings } from "@langchain/cohere";
import OpenAI from "openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { RetrievalQAChain } from "langchain/chains";

const anyscale = new OpenAI({
    baseURL: "https://api.endpoints.anyscale.com/v1",
    apiKey: "esecret_u2sbcvxgegri9x31reyagyurgb",
    modelName:"Open-Orca/Mistral-7B-OpenOrca",
    temperature:0.7
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

    const embeddings = new CohereEmbeddings({
      apiKey: "PtVIxuqTBJYMP1GAhjsXbFso9hX08lGVZjIcwBVT", 
      batchSize: 48, 
    });

    const loadedVectorStore = await FaissStore.load(
      "pages/api/vectordb",
      embeddings
    );

    
    // const vectorStoreRetriever = loadedVectorStore.asRetriever();
    // const chain = RetrievalQAChain.fromLLM(anyscale.chat.completions, vectorStoreRetriever);
    // const theResponse = await chain.invoke({
    //   query:question,
    // });

    const alldata = await loadedVectorStore.similaritySearch(question,3);
    const pdfSourcesAndPageNumbers = alldata.map(item => ({
      source: item.metadata.source,
      pageNumber: item.metadata.loc.pageNumber
  }));
  
  console.log(JSON.stringify(pdfSourcesAndPageNumbers, null, 2));
    let context = ""; // Initialize context as an empty string

    alldata.forEach((item, i) => {
        context = context + item.pageContent;
    });

    const completion = await anyscale.chat.completions.create({
        model: "Open-Orca/Mistral-7B-OpenOrca",
        messages: [{"role": "system", "content": `You are a professional educational assistant. Get to the answer directly without any extra content that is not necessary. Answer only based on context, do not make up answers, tell you don't know when you don't. context: ${context} `},
        {"role": "user", "content": question}],
        temperature: 0.7
    });

    const theResponse = completion.choices[0].message;
    // console.log(theResponse)
    res.status(200).json({ answer: theResponse,sources: pdfSourcesAndPageNumbers });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
