import { AnimalTypeDiseasesModel } from "../models/animalTypeDiseases.model.js";

export class AnimalTypeDiseasesService {
  // Создать запись связи между типом животного и заболеванием
  static async create(animalTypeId, diseasesId) {
    try {
      return await AnimalTypeDiseasesModel.create(animalTypeId, diseasesId);
    } catch (error) {
      throw new Error("Ошибка при создании записи: " + error.message);
    }
  }

  // Получить все записи
  static async getAll() {
    try {
      return await AnimalTypeDiseasesModel.getAll();
    } catch (error) {
      throw new Error("Ошибка при получении всех записей: " + error.message);
    }
  }

  // Получить запись по ID
  static async getById(id) {
    try {
      return await AnimalTypeDiseasesModel.getById(id);
    } catch (error) {
      throw new Error("Ошибка при получении записи: " + error.message);
    }
  }

  // Получить записи по ID типа животного
  static async getByAnimalTypeId(animalTypeId) {
    try {
      return await AnimalTypeDiseasesModel.getByAnimalTypeId(animalTypeId);
    } catch (error) {
      throw new Error(
        "Ошибка при получении записей по AnimalTypeId: " + error.message
      );
    }
  }

  // Получить записи по ID заболевания
  static async getByDiseasesId(diseasesId) {
    try {
      return await AnimalTypeDiseasesModel.getByDiseasesId(diseasesId);
    } catch (error) {
      throw new Error(
        "Ошибка при получении записей по DiseasesId: " + error.message
      );
    }
  }

  // Обновить запись
  static async update(id, data) {
    try {
      return await AnimalTypeDiseasesModel.update(id, data);
    } catch (error) {
      throw new Error("Ошибка при обновлении записи: " + error.message);
    }
  }

  // Удалить запись
  static async delete(id) {
    try {
      return await AnimalTypeDiseasesModel.delete(id);
    } catch (error) {
      throw new Error("Ошибка при удалении записи: " + error.message);
    }
  }
}
