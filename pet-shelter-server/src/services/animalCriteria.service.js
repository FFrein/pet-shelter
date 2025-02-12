import { AnimalCriteriaModel } from "../models/animalCriteria.model.js";

export class AnimalCriteriaService {
  // Получить все связи животных и критериев
  static async getAll() {
    try {
      return await AnimalCriteriaModel.getAll();
    } catch (e) {
      throw new Error(
        "Ошибка при получении связей животных и критериев: " + e.message
      );
    }
  }

  // Получить связь по ID
  static async getById(id) {
    try {
      if (!id) {
        throw new Error("ID связи обязателен");
      }
      return await AnimalCriteriaModel.getById(id);
    } catch (e) {
      throw new Error("Ошибка при получении связи: " + e.message);
    }
  }

  // Получить связь по ID
  static async getByAnimalId(id) {
    try {
      if (!id) {
        throw new Error("ID связи обязателен");
      }
      return await AnimalCriteriaModel.getByAnimalId(id);
    } catch (e) {
      throw new Error("Ошибка при получении связи: " + e.message);
    }
  }

  // Создать новую связь
  static async create(animalId, criteriaId) {
    try {
      if (!animalId || !criteriaId) {
        throw new Error(
          "Animal ID и Criteria ID обязательны для создания связи"
        );
      }
      return await AnimalCriteriaModel.create(animalId, criteriaId);
    } catch (e) {
      throw new Error("Ошибка при создании связи: " + e.message);
    }
  }

  // Обновить связь
  static async update(id, animalId, criteriaId) {
    try {
      if (!id) {
        throw new Error("ID связи обязателен для обновления");
      }
      return await AnimalCriteriaModel.update(id, {
        AnimalId: animalId,
        CriteriaId: criteriaId,
      });
    } catch (e) {
      throw new Error("Ошибка при обновлении связи: " + e.message);
    }
  }

  // Удалить связь
  static async delete(id) {
    try {
      if (!id) {
        throw new Error("ID связи обязателен для удаления");
      }
      return await AnimalCriteriaModel.delete(id);
    } catch (e) {
      throw new Error("Ошибка при удалении связи: " + e.message);
    }
  }
}
