import { AnimalTypeDiseasesService } from "../services/animalsTypeDiseases.service.js";

export class AnimalTypeDiseasesController {
  // Создать новую связь между типом животного и заболеванием
  static async create(req, res) {
    const { animalTypeId, diseasesId } = req.body;
    try {
      if (!animalTypeId || !diseasesId) {
        return res
          .status(400)
          .json({ error: "Поля animalTypeId и diseasesId обязательны" });
      }
      const record = await AnimalTypeDiseasesService.create(
        animalTypeId,
        diseasesId
      );
      return res.status(201).json(record);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при создании записи",
        message: error.message,
      });
    }
  }

  // Получить все записи
  static async getAll(req, res) {
    try {
      const records = await AnimalTypeDiseasesService.getAll();
      return res.status(200).json(records);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении всех записей",
        message: error.message,
      });
    }
  }

  // Получить запись по ID
  static async getById(req, res) {
    const { id } = req.params;
    try {
      const record = await AnimalTypeDiseasesService.getById(id);
      if (!record) {
        return res.status(404).json({ error: "Запись не найдена" });
      }
      return res.status(200).json(record);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении записи",
        message: error.message,
      });
    }
  }

  // Получить записи по AnimalTypeId
  static async getByAnimalTypeId(req, res) {
    const { animalTypeId } = req.params;
    try {
      const records = await AnimalTypeDiseasesService.getByAnimalTypeId(
        animalTypeId
      );
      return res.status(200).json(records);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении записей по AnimalTypeId",
        message: error.message,
      });
    }
  }

  // Получить записи по DiseasesId
  static async getByDiseasesId(req, res) {
    const { diseasesId } = req.params;
    try {
      const records = await AnimalTypeDiseasesService.getByDiseasesId(
        diseasesId
      );
      return res.status(200).json(records);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении записей по DiseasesId",
        message: error.message,
      });
    }
  }

  // Обновить запись
  static async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedRecord = await AnimalTypeDiseasesService.update(id, data);
      return res.status(200).json(updatedRecord);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при обновлении записи",
        message: error.message,
      });
    }
  }

  // Удалить запись
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedRecord = await AnimalTypeDiseasesService.delete(id);
      return res.status(200).json(deletedRecord);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при удалении записи",
        message: error.message,
      });
    }
  }
}
