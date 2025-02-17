import TelegramBot from "node-telegram-bot-api";
import { commandHandler } from "./handler.js";

const token = "8094384133:AAEqJjMY6GuXs9QX-aa99GXontTtqm_YEww";

export const bot = new TelegramBot(token, { polling: true });

commandHandler(bot);
