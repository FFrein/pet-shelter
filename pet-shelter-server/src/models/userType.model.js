import { prisma } from "../database/db.js";

export class UserTypeModel {
  static async create(userType) {
    return await prisma.userTypes.create({
      data: {
        TypeName: userType.typeName,
        Description: userType.description,
      },
    });
  }

  static async getAll() {
    return await prisma.userTypes.findMany();
  }

  static async getById(id) {
    return await prisma.userTypes.findUnique({ where: { ID: id } });
  }

  static async update(id, data) {
    return await prisma.userTypes.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.userTypes.delete({ where: { ID: id } });
  }
}
