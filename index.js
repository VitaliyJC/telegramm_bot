import { Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import OpenAI from "openai";

import { Loader } from "./loader.js";
import { showMenu, closeMenu } from "./menu.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env["API_KEY"],
});

const history = [];

const getChat = async (userMessage) => {
  history.push({ role: "user", content: userMessage });
  const res = await openai.chat.completions.create({
    model: "gpt-4-0613",
    messages: history,
  });
  return res.choices[0].message.content;
};

const bot = new Telegraf(process.env["API_TELEGRAM_AI"], {});

bot.start((ctx) => ctx.reply("Добро пожаловать!"));

bot.on("message", async (ctx) => {
  const chatId = ctx.chat.id;
  try {
    const loader = new Loader(ctx);
    if (ctx.message.text === "меню") {
      showMenu(bot, chatId);
    } else if (ctx.message.text === "Очистить историю переписки") {
      history.splice(0, history.length);
    } else if (ctx.message.text === "Закрыть меню") {
      closeMenu(bot, chatId);
    } else {
      let userMessage = ctx.message.text;
      loader.show();
      let chat = await getChat(userMessage);
      loader.hide();
      ctx.reply(chat);
    }
  } catch (error) {
    console.log(`Error while proccessing gpt response`, error.message);
  }
});

bot.launch();
