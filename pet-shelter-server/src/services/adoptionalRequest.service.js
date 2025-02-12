import { AdoptionRequestModel } from "../models/adoptionalRequest.js";

export class AdoptionRequestService {
  // Создать новую заявку
  static async create(requestData) {
    try {
      return await AdoptionRequestModel.create(requestData);
    } catch (error) {
      throw new Error("Ошибка при создании заявки: " + error.message);
    }
  }

  // Получить все заявки
  static async getAll(query) {
    try {
      const whereClause = {};

      // Добавляем параметры только если они существуют
      if (query?.UserId) {
        whereClause.UserId = query.UserId;
      }
      if (query?.AnimalId) {
        whereClause.AnimalId = query.AnimalId;
      }
      if (query?.isProcessed !== undefined) {
        whereClause.isProcessed = query.isProcessed;
      }
      if (query?.petShelterId) {
        whereClause.Animal = { PetShelterId: query.petShelterId };
      }
      // Выполняем запрос с динамически сформированным where
      return await AdoptionRequestModel.getAll(whereClause);
    } catch (error) {
      throw new Error("Ошибка при получении списка заявок: " + error.message);
    }
  }

  // Получить заявку по ID
  static async getById(query) {
    try {
      const whereClause = {};

      // Добавляем параметры только если они существуют
      if (query.UserId) {
        whereClause.UserId = query.UserId;
      }
      if (query.AnimalId) {
        whereClause.AnimalId = query.AnimalId;
      }
      whereClause.isProcessed = 0;

      const request = await AdoptionRequestModel.getById(whereClause);
      if (!request) {
        return null;
      }
      return request;
    } catch (error) {
      throw new Error("Ошибка при получении заявки: " + error.message);
    }
  }

  // Обновить заявку
  static async update(id, updateData) {
    try {
      const request = await AdoptionRequestModel.getById({ ID: id });
      if (!request) {
        throw new Error("Заявка с таким ID не найдена");
      }
      return await AdoptionRequestModel.update(id, updateData);
    } catch (error) {
      throw new Error("Ошибка при обновлении заявки: " + error.message);
    }
  }

  // Удалить заявку
  static async delete(id) {
    try {
      const request = await AdoptionRequestModel.getById(id);
      if (!request) {
        throw new Error("Заявка с таким ID не найдена");
      }
      return await AdoptionRequestModel.delete(id);
    } catch (error) {
      throw new Error("Ошибка при удалении заявки: " + error.message);
    }
  }
}
