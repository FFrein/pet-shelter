import { AnimalDiseasesService } from "../services/animalsDiseases.service.js";

export class AnimalDiseasesController {
  // Создать запись
  static async create(req, res) {
    const { animalId, diseasesId } = req.body;
    try {
      if (!animalId || !diseasesId) {
        return res
          .status(400)
          .json({ error: "AnimalId и DiseasesId обязательны" });
      }
      const record = await AnimalDiseasesService.create(animalId, diseasesId);
      return res.status(201).json(record);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Ошибка при создании записи", message: error.message });
    }
  }

  // Получить все записи
  static async getAll(req, res) {
    try {
      //TODO если удаляется sHelterManager сделать првоерку что животное принадлежит приюту
      const records = await AnimalDiseasesService.getAll();
      return res.status(200).json(records);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении записей",
        message: error.message,
      });
    }
  }

  // Получить запись по ID
  static async getById(req, res) {
    const { id } = req.params;
    try {
      //TODO если удаляется sHelterManager сделать првоерку что животное принадлежит приюту
      const record = await AnimalDiseasesService.getById(id);
      if (!record) {
        return res.status(404).json({ error: "Запись не найдена" });
      }
      return res.status(200).json(record);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении записи", message: error.message });
    }
  }

  // Получить записи по AnimalId
  static async getByAnimalId(req, res) {
    const { animalId } = req.params;
    try {
      //TODO если удаляется sHelterManager сделать првоерку что животное принадлежит приюту
      const records = await AnimalDiseasesService.getByAnimalId(animalId);
      return res.status(200).json(records);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении записей",
        message: error.message,
      });
    }
  }

  // Получить записи по DiseasesId
  static async getByDiseasesId(req, res) {
    const { diseasesId } = req.params;
    try {
      //TODO если удаляется sHelterManager сделать првоерку что животное принадлежит приюту
      const records = await AnimalDiseasesService.getByDiseasesId(diseasesId);
      return res.status(200).json(records);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении записей",
        message: error.message,
      });
    }
  }

  // Обновить запись
  static async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      //TODO если удаляется sHelterManager сделать првоерку что животное принадлежит приюту
      const updatedRecord = await AnimalDiseasesService.update(id, data);
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
      //TODO если удаляется sHelterManager сделать првоерку что животное принадлежит приюту
      if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: "id должно быть числом" });
      }
      const deletedRecord = await AnimalDiseasesService.delete(parseInt(id));
      return res.status(200).json(deletedRecord);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Ошибка при удалении записи", message: error.message });
    }
  }
}
