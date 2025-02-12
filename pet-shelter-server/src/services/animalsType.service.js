import AnimalTypeModel from "../models/animalType.model.js";

export default class AnimalTypeService {
  static async getAll() {
    try {
      return await AnimalTypeModel.getAll();
    } catch (error) {
      throw new Error("Ошибка при получении типов животных: " + error.message);
    }
  }

  static async getById(id) {
    try {
      return await AnimalTypeModel.getById(id);
    } catch (error) {
      throw new Error("Ошибка при получении типа животного: " + error.message);
    }
  }

  static async create(animalTypeData) {
    try {
      return await AnimalTypeModel.create(animalTypeData);
    } catch (error) {
      throw new Error("Ошибка при создании типа животного: " + error.message);
    }
  }

  static async update(id, animalTypeData) {
    try {
      return await AnimalTypeModel.update(id, animalTypeData);
    } catch (error) {
      throw new Error("Ошибка при обновлении типа животного: " + error.message);
    }
  }

  static async delete(id) {
    try {
      return await AnimalTypeModel.delete(id);
    } catch (error) {
      throw new Error("Ошибка при удалении типа животного: " + error.message);
    }
  }
}
