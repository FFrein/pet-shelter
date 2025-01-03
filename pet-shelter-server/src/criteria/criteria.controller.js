import CriteriaService from "./criteria.service.js";

export class CriteriaController {
  // Получить все критерии
  static async getAll(req, res) {
    try {
      const criteria = await CriteriaService.getAll();
      return res.status(200).json(criteria);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении критериев", message: e.message });
    }
  }

  // Получить критерий по ID
  static async getById(req, res) {
    try {
      const { id } = req.params;

      // Проверка: ID должен быть числом и присутствовать
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          error: "Некорректный ID. Пожалуйста, укажите правильный ID.",
        });
      }

      const criterion = await CriteriaService.getById(Number(id));

      if (!criterion) {
        return res.status(404).json({ error: "Критерий с таким ID не найден" });
      }

      return res.status(200).json(criterion);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении критерия", message: e.message });
    }
  }

  // Создание нового критерия
  static async create(req, res) {
    try {
      const { name, description } = req.body;

      // Проверка на обязательные поля
      if (!name || !description) {
        return res
          .status(400)
          .json({ error: "Имя и описание обязательны для создания" });
      }

      const criterion = await CriteriaService.create({
        Name: name,
        Description: description,
      });
      return res.status(201).json(criterion);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при создании критерия", message: e.message });
    }
  }

  // Обновить критерий
  static async update(req, res) {
    try {
      const { name, description } = req.body;
      const { id } = req.params;

      // Проверка на обязательные поля
      if (!id || !name || !description) {
        return res
          .status(400)
          .json({ error: "ID, имя и описание обязательны для обновления" });
      }

      // Проверка на обязательные поля
      if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: "ID должно быть числом" });
      }

      const updatedCriterion = await CriteriaService.update(parseInt(id), {
        Name: name,
        Description: description,
      });
      return res.status(200).json(updatedCriterion);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при обновлении критерия", message: e.message });
    }
  }

  // Удалить критерий
  static async delete(req, res) {
    try {
      const { id } = req.params;

      // Проверка: ID должен быть числом и присутствовать
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          error: "Некорректный ID. Пожалуйста, укажите правильный ID.",
        });
      }

      await CriteriaService.delete(Number(id));
      return res.status(200).json({ message: "Критерий успешно удалён" });
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при удалении критерия", message: e.message });
    }
  }
}
