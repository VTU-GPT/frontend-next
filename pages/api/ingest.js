import { CohereEmbeddings } from "@langchain/cohere";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

/* Embed queries */
export default async function handler(req,res) {

const directoryLoader = new DirectoryLoader(
    "public/documents/",
    {
        ".pdf": (path) => new PDFLoader(path),
    }
    );
    
const docs = await directoryLoader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
    });
    
const splitDocs = await textSplitter.splitDocuments(docs);
// console.log({ splitDocs });
const embeddings = new CohereEmbeddings({
  apiKey: "PtVIxuqTBJYMP1GAhjsXbFso9hX08lGVZjIcwBVT", 
  batchSize: 48, 
});
const vectorDir = "pages/api/vectordb/";
const vectorStore = await FaissStore.fromDocuments(docs, embeddings);
await vectorStore.save(vectorDir);
res.status(200).json({ savedDir: "Vector DB Stored in "+vectorDir});
}