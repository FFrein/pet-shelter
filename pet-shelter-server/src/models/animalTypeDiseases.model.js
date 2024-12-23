import { prisma } from "../database/db.js";

export class AnimalTypeDiseasesModel {
  static async create(animalTypeId, diseasesId) {
    return await prisma.animalTypeDiseases.create({
      data: {
        AnimalTypeId: animalTypeId,
        DiseasesId: diseasesId,
      },
    });
  }

  static async getAll() {
    return await prisma.animalTypeDiseases.findMany();
  }

  static async getById(id) {
    return await prisma.animalTypeDiseases.findUnique({ where: { ID: id } });
  }

  static async getByAnimalTypeId(animalTypeId) {
    return await prisma.animalTypeDiseases.findMany({
      where: { AnimalTypeId: animalTypeId },
    });
  }

  static async getByDiseasesId(diseasesId) {
    return await prisma.animalTypeDiseases.findMany({
      where: { DiseasesId: diseasesId },
    });
  }

  static async update(id, data) {
    return await prisma.animalTypeDiseases.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.animalTypeDiseases.delete({ where: { ID: id } });
  }
}
