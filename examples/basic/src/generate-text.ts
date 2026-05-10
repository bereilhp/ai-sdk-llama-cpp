import { generateText } from "ai";
import { llamaCpp } from "ai-sdk-llama-cpp";
import { modelOptions } from "./model-path.js";
import { reportError } from "./report-error.js";

const model = llamaCpp(modelOptions);

try {
  const result = await generateText({
    model,
    prompt: "Invent a new holiday and describe its traditions.",
  });

  console.log(result.text);
  console.log();
  console.log("Usage:", result.usage);
  console.log("Finish reason:", result.finishReason);
} catch (error) {
  reportError(error);
  process.exitCode = 1;
} finally {
  await model.dispose();
}
