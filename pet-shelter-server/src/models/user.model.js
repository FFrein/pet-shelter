import { prisma } from "../database/db.js";

export class UserModel {
  static async create(user) {
    return await prisma.users.create({
      data: {
        UserName: user.username,
        Password: user.password,
        Email: user.email,
        PhoneNumber: user.phonenumber,
        isBanned: 0,
        Role: user.role,
      },
    });
  }

  static async getAll() {
    return await prisma.users.findMany();
  }

  static async getById(id) {
    return await prisma.users.findUnique({ where: { ID: id } });
  }

  static async getByEmail(email) {
    return await prisma.users.findUnique({ where: { Email: email } });
  }

  static async update(id, data) {
    return await prisma.users.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.users.delete({ where: { ID: id } });
  }
}
