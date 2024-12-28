import AnimalService from "./animals.service.js";

export default class AnimalsController {
  // Получить все животные
  static async search(req, res, next) {
    try {
      const animals = await AnimalService.getAll();
      return res.status(200).json(animals);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении животных", message: e.message });
    }
  }

  // Создание нового животного
  static async create(req, res, next) {
    try {
      const { petShelterId, animalTypeId, name, description } = req.body;

      // Проверка на обязательные поля
      if (!petShelterId || !animalTypeId || !name || !description) {
        return res
          .status(400)
          .json({ error: "Все поля обязательны для заполнения" });
      }

      const animal = await AnimalService.create({
        petShelterId,
        animalTypeId,
        name,
        description,
      });
      return res.status(201).json(animal);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при создании животного", message: e.message });
    }
  }

  // Обновить данные животного
  static async update(req, res, next) {
    try {
      //TODO брать id из токена
      const { ID, petShelterId, animalTypeId, name, description } = req.body;

      // Проверка на обязательные поля
      if (!ID || !petShelterId || !animalTypeId || !name || !description) {
        return res
          .status(400)
          .json({ error: "Все поля обязательны для обновления" });
      }

      const updatedAnimal = await AnimalService.update(ID, {
        petShelterId,
        animalTypeId,
        name,
        description,
      });
      return res.status(200).json(updatedAnimal);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при обновлении животного", message: e.message });
    }
  }

  // Удаление животного
  static async delete(id) {
    try {
      return await AnimalModel.delete(id);
    } catch (e) {
      throw new Error("Ошибка при удалении животного: " + e.message);
    }
  }
}
