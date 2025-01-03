import { CriteriaModel } from "../models/criteria.model.js";

export default class CriteriaService {
  // Получить все критерии
  static async getAll() {
    try {
      return await CriteriaModel.getAll();
    } catch (e) {
      throw new Error("Ошибка при получении критериев: " + e.message);
    }
  }

  // Получить критерий по ID
  static async getById(id) {
    try {
      if (!id) {
        throw new Error("ID критерия обязателен");
      }
      return await CriteriaModel.getById(id);
    } catch (e) {
      throw new Error("Ошибка при получении критерия: " + e.message);
    }
  }

  // Создать новый критерий
  static async create(criteriaData) {
    try {
      if (!criteriaData.Name || !criteriaData.Description) {
        throw new Error("Имя и описание критерия обязательны для создания");
      }
      return await CriteriaModel.create(criteriaData);
    } catch (e) {
      throw new Error("Ошибка при создании критерия: " + e.message);
    }
  }

  // Обновить критерий
  static async update(id, criteriaData) {
    try {
      if (!id) {
        throw new Error("ID критерия обязателен для обновления");
      }
      return await CriteriaModel.update(id, criteriaData);
    } catch (e) {
      throw new Error("Ошибка при обновлении критерия: " + e.message);
    }
  }

  // Удалить критерий
  static async delete(id) {
    try {
      if (!id) {
        throw new Error("ID критерия обязателен для удаления");
      }
      return await CriteriaModel.delete(id);
    } catch (e) {
      throw new Error("Ошибка при удалении критерия: " + e.message);
    }
  }
}
