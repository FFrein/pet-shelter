import AnimalModel from "../models/animal.model.js";

export default class AnimalService {
  static async getAll() {
    try {
      return await AnimalModel.getAll();
    } catch (e) {
      throw new Error("Ошибка при получении животных: " + e.message);
    }
  }

  static async create(animalData) {
    try {
      return await AnimalModel.create(animalData);
    } catch (e) {
      throw new Error("Ошибка при создании животного: " + e.message);
    }
  }

  static async update(id, animalData) {
    try {
      return await AnimalModel.update(id, animalData);
    } catch (e) {
      throw new Error("Ошибка при обновлении животного: " + e.message);
    }
  }
}
