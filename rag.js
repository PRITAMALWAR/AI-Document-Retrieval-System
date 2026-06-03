

import readlineSync from "readline-sync";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import "dotenv/config";

async function rag() {

    const question = readlineSync.question(
        "\nAsk Me Anything => "
    );

    // NVIDIA Client
    const client = new OpenAI({
        apiKey: process.env.NVIDIA_API_KEY,
        baseURL: "https://integrate.api.nvidia.com/v1",
    });

    console.log("\nSearching Knowledge Base...");

    // Query Embedding
    const embeddingResponse = await client.embeddings.create({
        model: "nvidia/llama-nemotron-embed-1b-v2",
        input: question,
        input_type: "query",
    });

    const queryVector = embeddingResponse.data[0].embedding;

    // Pinecone
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pinecone.index(
        process.env.PINECONE_INDEX_NAME
    );

    // Retrieve top chunks
    const searchResult = await index.query({
        vector: queryVector,
        topK: 5,
        includeMetadata: true,
    });

    // Build Context
    let context = "";

    for (const match of searchResult.matches) {

        context += `
${match.metadata?.text}

--------------------------------
`;
    }

    console.log("Generating Answer...\n");

    // LLM Call
    const completion = await client.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
            {
                role: "system",
                content: `
You are a helpful AI assistant.

Answer ONLY from the provided context.

If the answer is not present in the context,
say:
"I could not find this information in the document."
`
            },
            {
                role: "user",
                content: `
Context:

${context}

Question:

${question}
`
            }
        ],
        temperature: 0.2,
        max_tokens: 1000,
    });

    console.log("\nAnswer:\n");

    console.log(
        completion.choices[0].message.content
    );
}

rag().catch(console.error);