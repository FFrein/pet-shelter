import { services } from "./services.js";

export const commandHandler = (bot) => {
  // Обработка команды /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    services.handleStartCommand(bot, chatId);
  });

  // Обработка команды /shelters
  bot.onText(/\/shelters/, (msg) => {
    const chatId = msg.chat.id;
    services.handleSheltersCommand(bot, chatId);
  });

  bot.onText(/\/notifications\s+(.+?)\s+(.+)/, (msg, match) => {
    if (!match || match.length < 3) {
      bot.sendMessage(
        msg.chat.id,
        "Используйте команду в формате: /notifications <страна> <город>"
      );
      return;
    }

    const chatId = msg.chat.id;
    const country = match[1].trim(); // Страна
    const city = match[2].trim(); // Город

    services.handleNotificationsCommand(bot, chatId, country, city);
  });
};
