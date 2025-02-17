import { prisma } from "../database/db.js";

export default class PetShelterModel {
  static async create(petShelter) {
    return await prisma.petShelter.create({
      data: {
        Name: petShelter.name,
        Address: petShelter.address,
        Email: petShelter.email,
        Password: petShelter.password,
        Description: petShelter.description,
        isBanned: petShelter.isBanned,
        City: petShelter.city,
        Country: petShelter.country,
      },
    });
  }

  static async getAll() {
    return await prisma.petShelter.findMany();
  }

  static async getFiltered(filter) {
    return await prisma.petShelter.findMany({ where: filter });
  }

  static async getById(id) {
    return await prisma.petShelter.findUnique({ where: { ID: id } });
  }

  static async getByEmail(email) {
    return await prisma.petShelter.findUnique({ where: { Email: email } });
  }

  static async update(id, data) {
    try {
      return await prisma.petShelter.update({
        where: { ID: id },
        data: {
          Name: data.name,
          Address: data.address,
          Email: data.email,
          Password: data.password,
          Description: data.description,
          isBanned: data.isBanned,
          City: data.City,
          Country: data.Country,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async delete(id) {
    return await prisma.petShelter.delete({ where: { ID: id } });
  }
}
