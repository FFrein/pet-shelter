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
  static async getAll(query) {
    try {
      const filters = {};
      let pagination = {};

      // Фильтр по Name с частичным совпадением (регистронезависимый)
      if (query?.search) {
        filters.Name = { contains: query.search };
      }
      // Пагинация
      const page = parseInt(query.page) || 1; // Номер страницы, по умолчанию 1
      const pageSize = parseInt(query.pageSize) || 10; // Размер страницы, по умолчанию 10
      const skip = (page - 1) * pageSize; // Сколько записей пропустить

      pagination = {
        skip,
        take: pageSize,
      };

      return await DiseaseModel.getAll(filters, pagination);
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
