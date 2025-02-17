import { Notification } from "../../models/notification.model.js";
import PetShelterModel from "../../models/petShelter.model.js";
import { bot } from "./bot.js";

class Services {
  constructor(bot) {
    this.bot = bot;
  }

  handleStartCommand = async (bot = this.bot, chatId) => {
    await bot.sendMessage(
      chatId,
      "Привет! Я бот, который помогает найти приюты и настраивать уведомления. Используйте команды /shelters или /notifications <страна> <город>"
    );
  };

  handleSheltersCommand = async (bot = this.bot, chatId) => {
    const shelters = await PetShelterModel.getAll();
    //Убрать отключенные приюты и забаненные
    const result = shelters.reduce((acc, shelter) => {
      return (
        acc +
        `ID: ${shelter.ID}, Name: ${shelter.Name}, Country: ${shelter.Country}, City: ${shelter.City}, Address: ${shelter.Address}\n`
      );
    }, "");

    await bot.sendMessage(chatId, "Список приютов: ...\n" + result);
  };

  handleNotificationsCommand = async (
    bot = this.bot,
    chatId,
    country,
    city
  ) => {
    try {
      const isExist = await PetShelterModel.getFiltered({
        isBanned: 0,
        City: city,
        Country: country,
      });

      if (isExist.length >= 1) {
        const user = (
          await Notification.getFiltered({
            TelegramChatId: chatId,
            Country: country,
            City: city,
          })
        )[0];

        if (user?.ID) {
          await Notification.delete(user.ID);
          await bot.sendMessage(
            chatId,
            `Уведомления для города ${city} удалены.`
          );
        } else {
          const notify = await Notification.create({
            TelegramChatId: chatId,
            Country: country,
            City: city,
          });
          await bot.sendMessage(
            chatId,
            `Уведомления для города ${city} настроены. Для удаления повторно выполнить эту команду с теми же данными`
          );
        }
      } else {
        await bot.sendMessage(chatId, `Не найден ни один приют в этом городе`);
      }
    } catch (e) {
      console.log(e);
      await bot.sendMessage(chatId, `Неправильное использование комманды`);
    }
  };

  notifyUsers = async (animal, bot = this.bot) => {
    const shelter = await PetShelterModel.getById(animal.PetShelterId);

    const users = await Notification.getFiltered({
      City: shelter.City,
    });

    users.forEach((user) => {
      bot.sendPhoto(user.TelegramChatId, animal.ImageUrl, {
        caption: `Появилось новое животное "${animal.Name}" в приюте ${shelter.Name}`,
      });
    });
  };
}

export const services = new Services(bot);
