import * as dotenv from "dotenv";
import OpenAI from "openai";
import * as readline from "node:readline";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["API_KEY"],
});

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

const history = [];

userInterface.on("line", async (line) => {
  history.push({ role: "user", content: line });
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: history,
  });

  console.log(
    `${res.choices[0].message.role}: ${res.choices[0].message.content}`
  );
  userInterface.prompt();
});
