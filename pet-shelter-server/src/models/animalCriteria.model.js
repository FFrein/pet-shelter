import { prisma } from "../database/db.js";

export class AnimalCriteriaModel {
  static async create(animalId, criteriaId) {
    return await prisma.animalCriteria.create({
      data: {
        AnimalId: animalId,
        CriteriaId: criteriaId,
      },
    });
  }

  static async getAll() {
    return await prisma.animalCriteria.findMany();
  }

  static async getById(id) {
    return await prisma.animalCriteria.findUnique({ where: { ID: id } });
  }

  static async getByAnimalId(animalId) {
    return await prisma.animalCriteria.findMany({
      where: { AnimalId: animalId },
    });
  }

  static async getByCriteriaId(criteriaId) {
    return await prisma.animalCriteria.findMany({
      where: { CriteriaId: criteriaId },
    });
  }

  static async update(id, data) {
    return await prisma.animalCriteria.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.animalCriteria.delete({ where: { ID: id } });
  }
}
