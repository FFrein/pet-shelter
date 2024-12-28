import { prisma } from "../database/db.js";

export default class PetShelterModel {
  // Создать новый приют
  static async create(petShelter) {
    return await prisma.petShelter.create({
      data: {
        Name: petShelter.name,
        Address: petShelter.address,
        Email: petShelter.email,
        Password: petShelter.password,
        Description: petShelter.description,
        isBanned: petShelter.isBanned,
      },
    });
  }

  // Получить все приюты
  static async getAll() {
    return await prisma.petShelter.findMany();
  }

  // Получить приют по ID
  static async getById(id) {
    return await prisma.petShelter.findUnique({ where: { ID: id } });
  }

  static async getByEmail(email) {
    return await prisma.petShelter.findUnique({ where: { Email: email } });
  }

  // Обновить информацию о приюте
  static async update(id, data) {
    return await prisma.petShelter.update({
      where: { ID: id },
      data: {
        Name: data.name,
        Address: data.address,
        Email: data.email,
        Password: data.password,
        Description: data.description,
        isBanned: data.isBanned,
      },
    });
  }

  // Удалить приют
  static async delete(id) {
    return await prisma.petShelter.delete({ where: { ID: id } });
  }
}
