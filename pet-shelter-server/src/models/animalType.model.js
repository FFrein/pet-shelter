import { prisma } from "../database/db.js";

export default class AnimalTypeModel {
  static async getAll() {
    return await prisma.animalType.findMany();
  }

  static async getById(id) {
    return await prisma.animalType.findUnique({ where: { ID: id } });
  }

  static async create(animalTypeData) {
    return await prisma.animalType.create({
      data: {
        TypeName: animalTypeData.TypeName,
        Description: animalTypeData.Description,
      },
    });
  }

  static async update(id, animalTypeData) {
    return await prisma.animalType.update({
      where: { ID: id },
      data: {
        TypeName: animalTypeData.TypeName,
        Description: animalTypeData.Description,
      },
    });
  }

  static async delete(id) {
    return await prisma.animalType.delete({
      where: { ID: id },
    });
  }
}
