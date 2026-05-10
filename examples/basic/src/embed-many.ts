import { embedMany } from "ai";
import { llamaCpp } from "ai-sdk-llama-cpp";
import { modelOptions } from "./model-path.js";
import { reportError } from "./report-error.js";

const model = llamaCpp.embedding(modelOptions);

try {
  const result = await embedMany({
    model,
    values: ["sunny day at the beach", "rainy afternoon in the city"],
  });

  console.log("Embeddings:", result.embeddings.length);
  console.log("Dimensions:", result.embeddings[0].length);
  console.log();
  console.log("Usage:", result.usage);
} catch (error) {
  reportError(error);
  process.exitCode = 1;
} finally {
  await model.dispose();
}
