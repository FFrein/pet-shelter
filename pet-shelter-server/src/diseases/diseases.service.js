import { DiseaseModel } from "../models/disease.model.js";

export class DiseaseService {
  // Создать новое заболевание
  static async create(diseaseData) {
    try {
      return await DiseaseModel.create(diseaseData);
    } catch (error) {
      throw new Error("Ошибка при создании заболевания: " + error.message);
    }
  }

  // Получить все заболевания
  static async getAll() {
    try {
      return await DiseaseModel.getAll();
    } catch (error) {
      throw new Error(
        "Ошибка при получении списка заболеваний: " + error.message
      );
    }
  }

  // Получить заболевание по ID
  static async getById(id) {
    try {
      return await DiseaseModel.getById(id);
    } catch (error) {
      throw new Error("Ошибка при получении заболевания: " + error.message);
    }
  }

  // Обновить заболевание
  static async update(id, diseaseData) {
    try {
      return await DiseaseModel.update(id, diseaseData);
    } catch (error) {
      throw new Error("Ошибка при обновлении заболевания: " + error.message);
    }
  }

  // Удалить заболевание
  static async delete(id) {
    try {
      return await DiseaseModel.delete(id);
    } catch (error) {
      throw new Error("Ошибка при удалении заболевания: " + error.message);
    }
  }
}
