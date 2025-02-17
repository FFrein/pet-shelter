import { prisma } from "../database/db.js";

export class Notification {
  static async create(notification) {
    return await prisma.notification.create({
      data: {
        TelegramChatId: notification.TelegramChatId,
        City: notification.City,
        Country: notification.Country,
      },
    });
  }

  static async getAll() {
    return await prisma.notification.findMany();
  }

  static async getById(id) {
    return await prisma.notification.findUnique({ where: { ID: id } });
  }

  static async getFiltered(filter) {
    return await prisma.notification.findMany({ where: filter });
  }

  static async update(id, data) {
    return await prisma.notification.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.notification.delete({ where: { ID: id } });
  }
}
