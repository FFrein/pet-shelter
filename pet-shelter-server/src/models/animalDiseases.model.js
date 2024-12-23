import { prisma } from "../database/db.js";

export class AnimalDiseasesModel {
  static async create(animalId, diseasesId) {
    return await prisma.animalDiseases.create({
      data: {
        AnimalId: animalId,
        DiseasesId: diseasesId,
      },
    });
  }

  static async getAll() {
    return await prisma.animalDiseases.findMany();
  }

  static async getById(id) {
    return await prisma.animalDiseases.findUnique({ where: { ID: id } });
  }

  static async getByAnimalId(animalId) {
    return await prisma.animalDiseases.findMany({
      where: { AnimalId: animalId },
    });
  }

  static async getByDiseasesId(diseasesId) {
    return await prisma.animalDiseases.findMany({
      where: { DiseasesId: diseasesId },
    });
  }

  static async update(id, data) {
    return await prisma.animalDiseases.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.animalDiseases.delete({ where: { ID: id } });
  }
}
