// Import the Pinecone library and dotenv for environment variables
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config();

// Validate environment variables
if (!process.env.PINECONE_API_KEY) {
  throw new Error("PINECONE_API_KEY is not defined in your environment.");
}

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Define your dataset of companies
const data = JSON.parse(
  await fs.readFile(path.join(path.resolve(), "trade-alert.companies.json"))
);

// Extract the company names to generate embeddings
const companyNames = data.map((company) => company.name);

// Create a lookup object for efficient data matching
const dataLookup = Object.fromEntries(
  data.map((company) => [company.name, company])
);

// Define the embedding model
const model = "multilingual-e5-large";

// Function to process data in batches
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// Specify the starting batch index
const startBatchIndex = 1; // Default to 0 if not provided

(async () => {
  try {
    // Split company names into batches of 50
    const batches = chunkArray(companyNames, 50);

    // Process each batch starting from the specified index
    for (const [batchIndex, batch] of batches.entries()) {
      if (batchIndex < startBatchIndex) {
        console.log(`Skipping batch ${batchIndex + 1}`);
        continue;
      }

      try {
        // Generate embeddings for the current batch
        const embeddings = await pc.inference.embed(model, batch, {
          inputType: "passage", // More appropriate for company names
          truncate: "END",
        });

        // Combine the embeddings with the corresponding company data
        const batchIndexedData = batch.map((name, index) => {
          const company = dataLookup[name];
          return {
            id: company.symbol, // Use the symbol as the unique ID
            name: company.name,
            embedding: embeddings[index], // Attach the corresponding embedding
          };
        });

        // Upsert the batch into Pinecone
        await pc.index("trade-alert").upsert(
          batchIndexedData.map((item) => ({
            id: item.id,
            values: item.embedding.values,
            metadata: { name: item.name }, // Include name as metadata
          }))
        );

        console.log(
          `Batch ${batchIndex + 1}/${batches.length} processed successfully.`
        );
      } catch (batchError) {
        console.error(`Error processing batch ${batchIndex + 1}:`, batchError);
        break;
      }
    }

    console.log("All data indexed successfully!");
  } catch (error) {
    console.error("Error generating embeddings:", error);
  }
})();
