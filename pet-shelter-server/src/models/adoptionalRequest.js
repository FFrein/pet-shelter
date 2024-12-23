import { prisma } from "../database/db.js";

export class AdoptionRequestModel {
  static async create(request) {
    return await prisma.adoptionRequest.create({
      data: {
        AnimalId: request.animalId,
        UserId: request.userId,
        isProcessed: request.isProcessed,
      },
    });
  }

  static async getAll() {
    return await prisma.adoptionRequest.findMany();
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
