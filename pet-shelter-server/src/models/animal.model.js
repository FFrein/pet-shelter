import { prisma } from "../database/db.js";

export default class AnimalModel {
  // Создание нового животного
  static async create(animal) {
    return await prisma.animal.create({
      data: {
        PetShelterId: animal.petShelterId,
        AnimalTypeId: animal.animalTypeId,
        Name: animal.name,
        Description: animal.description,
      },
    });
  }

  // Получить все животные
  static async getAll() {
    try {
      return await prisma.animal.findMany({
        include: {
          PetShelter: true, // Включаем информацию о приюте, если нужно
          AnimalType: true, // Включаем тип животного
        },
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  // Получить животное по ID
  static async getById(id) {
    return await prisma.animal.findUnique({
      where: { ID: id },
      include: {
        PetShelter: true,
        AnimalType: true,
      },
    });
  }

  // Обновление данных животного
  static async update(id, data) {
    return await prisma.animal.update({
      where: { ID: id },
      data: {
        PetShelterId: data.petShelterId,
        AnimalTypeId: data.animalTypeId,
        Name: data.name,
        Description: data.description,
      },
    });
  }

  // Удаление животного
  static async delete(id) {
    return await prisma.animal.delete({
      where: { ID: id },
    });
  }
}
