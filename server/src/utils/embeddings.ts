import "@tensorflow/tfjs-backend-cpu";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CohereEmbeddings } from "langchain/embeddings/cohere";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { TransformersEmbeddings } from "../embeddings/transformer-embedding";
import { GoogleGeckoEmbeddings } from "../embeddings/google-gecko-embedding";

export const embeddings = (embeddingsType: string) => {
  switch (embeddingsType) {
    case "tensorflow":
      return new TensorFlowEmbeddings();
    case "openai":
      return new OpenAIEmbeddings();
    case "cohere":
      return new CohereEmbeddings();
    case "huggingface-api":
      return new HuggingFaceInferenceEmbeddings();
    case "transformer":
      return new TransformersEmbeddings();
    case "bert":
      return new TransformersEmbeddings({
        model: "Xenova/bert-base-uncased",
      });
    case "google-gecko":
      console.log("using google-gecko");
      return new GoogleGeckoEmbeddings();
    default:
      return new OpenAIEmbeddings();
  }
};

export const supportedEmbeddings = [
  "tensorflow",
  "openai",
  "cohere",
  "huggingface-api",
  "transformer",
  "google-gecko",
  "bert",
];
