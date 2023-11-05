import { OpenAI } from 'openai';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (request, response) => {
    const prompt = request.body.prompt;

    const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
    });

    const image = aiResponse.data[0].url;
    response.send({ image });
});

app.listen(8080, () => console.log('Image generator running on http://localhost:8080/dream'));