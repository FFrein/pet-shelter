import { prisma } from "../database/db.js";

export class DiseaseModel {
  static async create(disease) {
    return await prisma.diseases.create({
      data: {
        Name: disease.name,
        Description: disease.description,
      },
    });
  }

  static async getAll(filters, pagination) {
    return await prisma.diseases.findMany({
      where: filters,
      ...pagination,
    });
  }

  static async getById(id) {
    return await prisma.diseases.findUnique({ where: { ID: id } });
  }

  static async update(id, data) {
    return await prisma.diseases.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.diseases.delete({ where: { ID: id } });
  }
}
