// Import the Pinecone library
const  { Pinecone } = require( '@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY});

const aichatengineIndex =  pc.Index("ai-chat-engine");

async function createMemory({vectors, metadata, messageId}){
    // Pinecone SDK expects: index.upsert({ records: [...] })
    if (!messageId) return;

    const records = [
        {
            id: messageId.toString(),
            values: vectors,
            metadata,
        },
    ];

    // Avoid Pinecone validation errors when embeddings fail to generate
    if (!records[0].values || !Array.isArray(records[0].values) || records[0].values.length === 0) {
        console.warn("createMemory: embeddings are empty; skipping Pinecone upsert.");
        return;
    }

    await aichatengineIndex.upsert({ records });
}

async function queryMemory({queryVector, limit=5, metadata}){
    const data = await aichatengineIndex.query({
        vector: queryVector,
        topK: limit,
        filter: metadata ? {metadata} : undefined,
        includeMetadata: true
    })

    return data.matches
}

module.exports = {createMemory, queryMemory}

