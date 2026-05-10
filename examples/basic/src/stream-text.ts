import { streamText } from "ai";
import { llamaCpp } from "ai-sdk-llama-cpp";
import { modelOptions } from "./model-path.js";
import { reportError } from "./report-error.js";

const model = llamaCpp(modelOptions);

try {
  const result = streamText({
    model,
    prompt: "Invent a new holiday and describe its traditions.",
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }

  console.log();
  console.log();
  console.log("Usage:", await result.usage);
  console.log("Finish reason:", await result.finishReason);
} catch (error) {
  reportError(error);
  process.exitCode = 1;
} finally {
  await model.dispose();
}
