import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI,
});

const openai = new OpenAIApi(configuration);

export default openai;