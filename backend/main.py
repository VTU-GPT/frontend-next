from fastapi import FastAPI, HTTPException
from langchain_community.embeddings import CohereEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms import Anyscale
from pydantic import BaseModel
import os

os.environ["ANYSCALE_API_BASE"] = "https://api.endpoints.anyscale.com/v1"
os.environ["ANYSCALE_API_KEY"] = 'esecret_u2sbcvxgegri9x31reyagyurgb'


app = FastAPI()

class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def read_root():
    return {"message": "Welcome to the Langchain API"}

def load_vectorstore():
        embeddings=CohereEmbeddings(cohere_api_key="PtVIxuqTBJYMP1GAhjsXbFso9hX08lGVZjIcwBVT")
        db = FAISS.load_local('vectordb', embeddings, allow_dangerous_deserialization=True)
        return db

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

@app.post("/query")
async def query(question_request: QuestionRequest):
    template = """You are a professional educational assistant. Get to the answer directly without any extra content that is not necessary. Answer only based on context, do not make up answers, tell you don't know when you don't.
Context: {context}
Question: {question}
If the answer cannot be found within the provided context, please respond with "I do not know what you are asking about."
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    llm = Anyscale(model_name='Open-Orca/Mistral-7B-OpenOrca')

    try:
        db = load_vectorstore()
        qa_chain = RetrievalQA.from_chain_type(
            llm,
            retriever=db.as_retriever(),
            return_source_documents=True,
            chain_type_kwargs={"prompt": prompt}
        )
        question = question_request.question
        result = qa_chain({"query": question})

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ingest")
async def ingest_documents():
    vector_dir = "vectordb/"

    try:
        # Load documents from the directory
        pdf_folder_path = "documents"
        documents = []
        for file in os.listdir(pdf_folder_path):
            if file.endswith('.pdf'):
                pdf_path = os.path.join(pdf_folder_path, file)
                loader = PyPDFLoader(pdf_path,extract_images=False)
                documents.extend(loader.load())
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=10)
        chunked_documents = text_splitter.split_documents(documents)


        embeddings = CohereEmbeddings(cohere_api_key="PtVIxuqTBJYMP1GAhjsXbFso9hX08lGVZjIcwBVT")


        # Create vector store and save it
        vector_store = FAISS.from_documents(chunked_documents, embeddings)
        vector_store.save_local(vector_dir)

        return {"message": f"Vector DB stored in {vector_dir}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
