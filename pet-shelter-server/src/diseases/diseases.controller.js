import { DiseaseService } from "./diseases.service.js";

export class DiseaseController {
  // Создать новое заболевание
  static async create(req, res) {
    const { name, description } = req.body;
    try {
      if (!name || !description) {
        return res
          .status(400)
          .json({ error: "Поля name и description обязательны" });
      }
      const disease = await DiseaseService.create({ name, description });
      return res.status(201).json(disease);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при создании заболевания",
        message: error.message,
      });
    }
  }

  // Получить все заболевания
  static async getAll(req, res) {
    try {
      const diseases = await DiseaseService.getAll(req.query);
      return res.status(200).json(diseases);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении списка заболеваний",
        message: error.message,
      });
    }
  }

  // Получить заболевание по ID
  static async getById(req, res) {
    const { id } = req.params;
    try {
      const numId = parseInt(id);
      if (isNaN(numId)) {
        return res.status(404).json({ error: "ID должно быть числом" });
      }
      const disease = await DiseaseService.getById(numId);
      if (!disease) {
        return res.status(404).json({ error: "Заболевание не найдено" });
      }
      return res.status(200).json(disease);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении заболевания",
        message: error.message,
      });
    }
  }

  // Обновить заболевание
  static async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const numId = parseInt(id);
      if (isNaN(numId)) {
        return res.status(404).json({ error: "ID должно быть числом" });
      }
      if (!name || !description) {
        return res
          .status(400)
          .json({ error: "Поля name и description обязательны" });
      }
      const updatedDisease = await DiseaseService.update(numId, {
        name,
        description,
      });
      return res.status(200).json(updatedDisease);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при обновлении заболевания",
        message: error.message,
      });
    }
  }

  // Удалить заболевание
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const numId = parseInt(id);
      if (isNaN(numId)) {
        return res.status(404).json({ error: "ID должно быть числом" });
      }
      const deletedDisease = await DiseaseService.delete(numId);
      return res.status(200).json(deletedDisease);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при удалении заболевания",
        message: error.message,
      });
    }
  }
}
