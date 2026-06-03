




















// =====================================

import readlineSync from "readline-sync";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import "dotenv/config";

async function query() {

    // User se question lo
    const question = readlineSync.question(
        "\nAsk Me Anything => "
    );

    // NVIDIA Client
    const client = new OpenAI({
        apiKey: process.env.NVIDIA_API_KEY,
        baseURL: "https://integrate.api.nvidia.com/v1",
    });

    console.log("\nCreating Query Embedding...");

    // Query Embedding
    const embeddingResponse = await client.embeddings.create({
        model: "nvidia/llama-nemotron-embed-1b-v2",
        input: question,
        input_type: "query",
    });

    const queryVector = embeddingResponse.data[0].embedding;

    // Pinecone Connection
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pinecone.index(
        process.env.PINECONE_INDEX_NAME
    );

    console.log("Searching Documents...\n");



    // Similarity Search
    const result = await index.query({
        vector: queryVector,
        topK: 5,
        includeMetadata: true,
    });

    console.log("Top Results:\n");



    for (let i = 0; i < result.matches.length; i++) {

        const match = result.matches[i];

        console.log(`Result ${i + 1}`);
        console.log(`Score: ${match.score}`);
        console.log(`Page: ${match.metadata?.page}`);

        console.log(
            String(match.metadata?.text || "").slice(0, 300)
        );

        console.log("\n-----------\n");
    }
}

query().catch(console.error);













// import { Pinecone } from "@pinecone-database/pinecone";
// import OpenAI from "openai";
// import "dotenv/config";

// async function query() {

//     const QUESTION = "What is javascript?";

//     // NVIDIA Client
//     const client = new OpenAI({
//         apiKey: process.env.NVIDIA_API_KEY,
//         baseURL: "https://integrate.api.nvidia.com/v1",
//     });

//     // Create Query Embedding
//     const embeddingResponse = await client.embeddings.create({
//         model: "nvidia/llama-nemotron-embed-1b-v2",
//         input: QUESTION,
//         input_type: "query",
//     });

//     const queryVector = embeddingResponse.data[0].embedding;

//     console.log("Query Embedding Created");

//     // Pinecone Connection
//     const pinecone = new Pinecone({
//         apiKey: process.env.PINECONE_API_KEY,
//     });

//     const index = pinecone.index(
//         process.env.PINECONE_INDEX_NAME
//     );

//     console.log("Searching...");

//     // Similarity Search
//     const result = await index.query({
//         vector: queryVector,
//         topK: 5,
//         includeMetadata: true,
//     });

//     console.log("\nTop Matches:\n");

//     result.matches.forEach((match, index) => {

//         console.log(`Result ${index + 1}`);
//         console.log("Score:", match.score);
//         console.log("Page:", match.metadata?.page);

//         console.log(
//             String(match.metadata?.text || "").slice(0, 300)
//         );

//         console.log(
//             "\n--------------------------------\n"
//         );
//     });
// }

// query().catch(console.error);





