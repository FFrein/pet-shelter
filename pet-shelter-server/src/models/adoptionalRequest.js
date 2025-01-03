import { prisma } from "../database/db.js";

export class AdoptionRequestModel {
  static async create(request) {
    console.log(request);
    return await prisma.adoptionRequest.create({
      data: {
        AnimalId: request.animalId,
        UserId: request.userId,
        description: request.description,
        isProcessed: 0,
      },
    });
  }

  // Получить все заявки с фильтрацией по PetShelterId
  static async getAll(query) {
    try {
      if (query?.Animal?.PetShelterId) {
        return await prisma.adoptionRequest.findMany({
          where: query,
          include: {
            Animal: true, // Включаем связанные записи животных для проверки
          },
        });
      }

      if (query?.UserId) {
        return await prisma.adoptionRequest.findMany({
          where: query,
          include: {
            Animal: true, // Включаем связанные записи животных для проверки
          },
        });
      }
    } catch (error) {
      throw new Error("Ошибка при получении списка заявок: " + error.message);
    }
  }
  //TODO сделать связку animalId и UserId уникальными
  static async getById(query) {
    return await prisma.adoptionRequest.findFirst({
      where: query,
      include: {
        Animal: true,
      },
    });
  }

  static async update(id, data) {
    return await prisma.adoptionRequest.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.adoptionRequest.delete({ where: { ID: id } });
  }
}
