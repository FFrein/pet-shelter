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
      if (query.petShelterId) {
        return await prisma.adoptionRequest.findMany({
          where: {
            Animal: {
              PetShelterId: query.petShelterId, // Фильтрация по PetShelterId через связь с Animal
            },
          },
          include: {
            Animal: true, // Включаем связанные записи животных для проверки
          },
        });
      }

      if (query.UserId) {
        return await prisma.adoptionRequest.findMany({
          where: {
            UserId: query.userId,
          },
          include: {
            Animal: true, // Включаем связанные записи животных для проверки
          },
        });
      }
    } catch (error) {
      throw new Error("Ошибка при получении списка заявок: " + error.message);
    }
  }

  static async getById(id) {
    return await prisma.adoptionRequest.findUnique({ where: { ID: id } });
  }

  static async update(id, data) {
    return await prisma.adoptionRequest.update({ where: { ID: id }, data });
  }

  static async delete(id) {
    return await prisma.adoptionRequest.delete({ where: { ID: id } });
  }
}
