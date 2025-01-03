import { AnimalCriteriaService } from "./animalCriteria.service.js";

// Контроллер для AnimalCriteria
export class AnimalCriteriaController {
  // Получить все связи животных и критериев
  static async getAll(req, res) {
    try {
      const links = await AnimalCriteriaService.getAll();
      return res.status(200).json(links);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении связей", message: e.message });
    }
  }

  // Получить связь по ID
  static async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Некорректный ID" });
      }

      const link = await AnimalCriteriaService.getById(Number(id));

      if (!link) {
        return res.status(404).json({ error: "Связь с таким ID не найдена" });
      }

      return res.status(200).json(link);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении связи", message: e.message });
    }
  }

  // Получить связь по ID
  static async getByAnimalId(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Некорректный ID" });
      }

      const link = await AnimalCriteriaService.getByAnimalId(Number(id));

      if (!link) {
        return res.status(404).json({ error: "Связь с таким ID не найдена" });
      }

      return res.status(200).json(link);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении связи", message: e.message });
    }
  }

  // Создание новой связи
  static async create(req, res) {
    try {
      const { animalId, criteriaId } = req.body;

      if (!animalId || !criteriaId) {
        return res
          .status(400)
          .json({ error: "Animal ID и Criteria ID обязательны" });
      }

      const link = await AnimalCriteriaService.create(animalId, criteriaId);
      return res.status(201).json(link);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при создании связи", message: e.message });
    }
  }

  // Обновление связи
  static async update(req, res) {
    try {
      const { id, animalId, criteriaId } = req.body;

      if (!id || !animalId || !criteriaId) {
        return res
          .status(400)
          .json({ error: "ID, Animal ID и Criteria ID обязательны" });
      }

      const updatedLink = await AnimalCriteriaService.update(
        id,
        animalId,
        criteriaId
      );
      return res.status(200).json(updatedLink);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при обновлении связи", message: e.message });
    }
  }

  // Удаление связи
  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Некорректный ID" });
      }

      await AnimalCriteriaService.delete(Number(id));
      return res.status(200).json({ message: "Связь успешно удалена" });
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при удалении связи", message: e.message });
    }
  }
}
