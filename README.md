# RAG-Powered PDF Knowledge Assistant

A Retrieval-Augmented Generation (RAG) application built with Node.js, Pinecone, NVIDIA Embedding Models, and Large Language Models.

This project allows users to upload a PDF, index its content into a vector database, and ask questions in natural language. The system retrieves the most relevant chunks from the document and generates accurate answers using an LLM.

---

## Features

* PDF document ingestion
* Intelligent text chunking
* Vector embeddings using NVIDIA Embedding Models
* Vector storage using Pinecone
* Semantic similarity search
* Retrieval-Augmented Generation (RAG)
* Interactive terminal-based chat
* Source-aware document question answering

---

## Tech Stack

* Node.js
* LangChain
* Pinecone Vector Database
* NVIDIA Embedding Models
* OpenAI Compatible API
* PDF Loader
* Readline Sync

---

## Project Structure

```bash
project/
│
├── Node.pdf
├── indexing.js
├── query.js
├── rag.js
├── .env
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd rag-pdf-assistant
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
NVIDIA_API_KEY=your_nvidia_api_key

PINECONE_API_KEY=your_pinecone_api_key

PINECONE_INDEX_NAME=node-pdf-rag
```

---

## Pinecone Configuration

Create a Pinecone index with:

```text
Index Name : node-pdf-rag
Dimension  : 2048
Metric     : cosine
```

The dimension must match the embedding model output.

---

## Indexing Documents

The indexing process:

1. Load PDF
2. Split into chunks
3. Generate embeddings
4. Store vectors in Pinecone

Run:

```bash
node indexing.js
```

Example output:

```bash
Loading PDF...
Total Chunks: 261
Pinecone Connected
Indexed 261/261
All Chunks Stored Successfully
```

---

## Retrieval

Search for relevant chunks from Pinecone:

```bash
node query.js
```

Example:

```bash
Ask Me Anything => What is Node.js?
```

---

## RAG Question Answering

Generate answers using retrieved document context.

Run:

```bash
node rag.js
```

Example:

```bash
Ask Me Anything => What is Node.js?

Answer:

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows developers to execute JavaScript outside the browser.
```

---

## Architecture

```text
PDF
 │
 ▼
Chunking
 │
 ▼
Embeddings
 │
 ▼
Pinecone Vector Store
 │
 ▼
Query Embedding
 │
 ▼
Similarity Search
 │
 ▼
Top Relevant Chunks
 │
 ▼
LLM
 │
 ▼
Final Answer
```

---

## Future Improvements

* Multi-PDF Support
* Web Interface
* Conversation Memory
* Hybrid Search
* Metadata Filtering
* Streaming Responses
* Citations with Page Numbers
* Authentication
* API Endpoints
* Production Deployment

---

## Learning Outcomes

Through this project you will learn:

* Retrieval-Augmented Generation (RAG)
* Vector Databases
* Embeddings
* Semantic Search
* LangChain Fundamentals
* Pinecone Integration
* LLM Application Development
* Generative AI Engineering

---

## Author

Pritam

Built as a Generative AI learning project using Node.js, Pinecone, NVIDIA Embeddings, and RAG Architecture.
