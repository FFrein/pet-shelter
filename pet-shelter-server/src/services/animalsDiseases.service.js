import { AnimalDiseasesModel } from "../models/animalDiseases.model.js";

export class AnimalDiseasesService {
  // Создать запись связи между животным и заболеванием
  static async create(animalId, diseasesId) {
    try {
      return await AnimalDiseasesModel.create(animalId, diseasesId);
    } catch (error) {
      throw new Error("Ошибка при создании записи: " + error.message);
    }
  }

  // Получить все записи
  static async getAll() {
    try {
      return await AnimalDiseasesModel.getAll();
    } catch (error) {
      throw new Error("Ошибка при получении всех записей: " + error.message);
    }
  }

  // Получить запись по ID
  static async getById(id) {
    try {
      return await AnimalDiseasesModel.getById(id);
    } catch (error) {
      throw new Error("Ошибка при получении записи: " + error.message);
    }
  }

  // Получить записи по ID животного
  static async getByAnimalId(animalId) {
    try {
      return await AnimalDiseasesModel.getByAnimalId(animalId);
    } catch (error) {
      throw new Error(
        "Ошибка при получении записей по AnimalId: " + error.message
      );
    }
  }

  // Получить записи по ID заболевания
  static async getByDiseasesId(diseasesId) {
    try {
      return await AnimalDiseasesModel.getByDiseasesId(diseasesId);
    } catch (error) {
      throw new Error(
        "Ошибка при получении записей по DiseasesId: " + error.message
      );
    }
  }

  // Обновить запись
  static async update(id, data) {
    try {
      return await AnimalDiseasesModel.update(id, data);
    } catch (error) {
      throw new Error("Ошибка при обновлении записи: " + error.message);
    }
  }

  // Удалить запись
  static async delete(id) {
    try {
      return await AnimalDiseasesModel.delete(id);
    } catch (error) {
      throw new Error("Ошибка при удалении записи: " + error.message);
    }
  }
}
