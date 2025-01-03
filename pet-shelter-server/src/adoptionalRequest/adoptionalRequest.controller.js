import { AdoptionRequestService } from "./adoptionalRequest.service.js";

export class AdoptionRequestController {
  static async create(req, res) {
    try {
      const { animalId, userId, description } = req.body;
      if (!animalId || !userId || !description) {
        return res
          .status(400)
          .json({ error: "Все поля обязательны для создания заявки" });
      }
      const request = await AdoptionRequestService.create({
        animalId,
        userId,
        description,
      });
      return res.status(201).json(request);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при создании заявки", message: e.message });
    }
  }

  // Получить все заявки
  static async getAll(req, res) {
    try {
      let requests;
      if (req.user.role == "shelterManager") {
        requests = await AdoptionRequestService.getAll({
          ...req.query,
          petShelterId: req.user.id,
        });
      } else if (req.user.role == "user") {
        requests = await AdoptionRequestService.getAll({
          ...req.query,
          UserId: req.user.id,
        });
      } else {
        requests = await AdoptionRequestService.getAll();
      }
      return res.status(200).json(requests);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении заявок", message: e.message });
    }
  }

  // Получить заявку по ID
  static async getById(req, res) {
    try {
      const { id } = req.params; // id - id животного
      if (isNaN(parseInt(id))) {
        return res.status(404).json({ error: "Id Должно быть числом" });
      }
      let request;
      if (req.user.role == "user") {
        request = await AdoptionRequestService.getById({
          AnimalId: parseInt(id),
          UserId: req.user.id,
        });
      } else {
        request = await AdoptionRequestService.getById({
          animalId: id,
          UserId: req.user.id,
        });
      }
      if (!request) {
        return res.status(200).json({ message: "Заявка не найдена" });
      }
      return res.status(200).json(request);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении заявки", message: e.message });
    }
  }

  // Обновить заявку
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { animalId, userId, isProcessed, answer } = req.body;

      const updatedRequest = await AdoptionRequestService.update(parseInt(id), {
        AnimalId: animalId ? parseInt(animalId) : undefined,
        UserId: userId ? parseInt(userId) : undefined,
        isProcessed: isProcessed ? parseInt(isProcessed) : undefined,
        answer: answer,
      });
      return res.status(200).json(updatedRequest);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при обновлении заявки", message: e.message });
    }
  }

  // Удалить заявку
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await AdoptionRequestService.delete(id);
      return res.status(200).json({ message: "Заявка успешно удалена" });
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при удалении заявки", message: e.message });
    }
  }
}
