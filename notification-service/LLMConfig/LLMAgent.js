import { ChatGroq } from "@langchain/groq";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

class LLMAgent {
  /**
   * Initializes the LLMAgent with a system prompt and model configuration.
   * @param {string} systemPrompt - The system-level prompt to guide the model.
   * @param {string} model - The specific model to use (e.g., "mixtral-8x7b-32768").
   * @param {number} temperature - The temperature for response randomness.
   */
  constructor(
    systemPrompt,
    userPrompt,
    model = "mixtral-8x7b-32768",
    temperature = 0
  ) {
    this.agent = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["user", userPrompt],
    ])
      .pipe(
        new ChatGroq({
          apiKey: process.env.GROQ_API_KEY,
          model: model,
          temperature: temperature,
        })
      )
      .pipe(new StringOutputParser());
  }

  /**
   * Generates a response from the LLM for a given user input.
   * @param {string} input - The user input to process.
   * @returns {Promise<string>} - The response from the model.
   */
  async getResponse(input) {
    try {
      const response = await this.agent.invoke({ input: input });
      return response;
    } catch (error) {
      console.error("Error generating response:", error);
      throw error;
    }
  }

  /**
   * Processes a batch of user inputs and generates responses for each.
   * @param {string[]} inputs - Array of user inputs to process.
   * @returns {Promise<string[]>} - Array of responses from the model.
   */
  async processBatch(inputs) {
    try {
      const responses = await Promise.all(
        inputs.map((input) => this.getResponse(input))
      );
      return responses;
    } catch (error) {
      console.error("Error processing batch:", error);
      throw error;
    }
  }
}

export default LLMAgent;
