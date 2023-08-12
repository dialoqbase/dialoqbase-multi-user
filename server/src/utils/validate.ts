export const apiKeyValidaton = (embeddingsType: string) => {
    switch (embeddingsType) {
        case "tensorflow":
            return true;
        case "transformer":
            return true;
        case "bert":
            return true;
        case "google-bison":
            return process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY.length > 0 : false;
        case "google-gecko":
            return process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY.length > 0 : false;
        case "openai":
            return process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length > 0 : false;
        case "cohere":
            return process.env.COHERE_API_KEY ? process.env.COHERE_API_KEY.length > 0 : false;
        case "huggingface-api":
            return process.env.HUGGINGFACEHUB_API_KEY ? process.env.HUGGINGFACEHUB_API_KEY.length > 0 : false;
        case "anthropic":
            return process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.length > 0 : false;
        default:
            true
    }
}

export const apiKeyValidatonMessage = (embeddingsType: string) => {
    switch (embeddingsType) {
        case "openai":
            return "Please add OPENAI_API_KEY to your .env file"
        case "cohere":
            return "Please add COHERE_API_KEY to your .env file"
        case "huggingface-api":
            return "Please add HUGGINGFACEHUB_API_KEY to your .env file"
        case "google-bison":
            return "Please add GOOGLE_API_KEY to your .env file"
        case "google-gecko":
            return "Please add GOOGLE_API_KEY to your .env file"
        case "anthropic":
            return "Please add ANTHROPIC_API_KEY to your .env file"
    }
}
