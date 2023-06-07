import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dbService from "./services/db.service.js";
import router from "./routes/auth.route.js";

dotenv.config();
const configration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configration);

// console.log(process.env.OPENAI_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", router);
app.post("/", async (req, res) => {
  try {
    const question = req.body.question;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${question}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.use((error, req, res, next) => {
  res.status(error.statusCode).send({ message: error.message });
  next();
});

const startServer = async () => {
  await dbService.connect();

  app.listen(8080, () => {
    console.log("App is running");
  });
};

startServer();
