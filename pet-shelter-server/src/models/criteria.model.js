import { prisma } from "../database/db.js";

export class CriteriaModel {
  static async create(criteria) {
    return await prisma.criteria.create({
      data: {
        Name: criteria.Name,
        Description: criteria.Description,
      },
    });
  }

  static async getAll() {
    return await prisma.criteria.findMany();
  }

  static async getById(id) {
    return await prisma.criteria.findUnique({ where: { ID: id } });
  }

  static async update(id, data) {
    return await prisma.criteria.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.criteria.delete({ where: { ID: id } });
  }
}
