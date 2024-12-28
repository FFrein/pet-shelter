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

  // Удалить животное
  static async delete(req, res, next) {
    try {
      const { ID } = req.params;

      if (!ID) {
        return res
          .status(400)
          .json({ error: "ID животного обязателен для удаления" });
      }

      await AnimalService.delete(ID);
      return res.status(200).json({ message: "Животное успешно удалено" });
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при удалении животного", message: e.message });
    }
  }
}
