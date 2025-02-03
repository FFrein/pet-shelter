import AnimalService from "./animals.service.js";

export default class AnimalsController {
  // Получить все животные
  static async search(req, res, next) {
    try {
      let animals;
      animals = await AnimalService.getAll({
        ...req.query,
      });
      return res.status(200).json(animals);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении животных", message: e.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      // Проверка: ID должен быть числом и присутствовать
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          error: "Некорректный ID. Пожалуйста, укажите правильный ID.",
        });
      }

      const animal = await AnimalService.getById(Number(id));

      if (!animal) {
        return res
          .status(404)
          .json({ error: "Животное с таким ID не найдено" });
      }

      return res.status(200).json(animal);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении животного", message: e.message });
    }
  }

  // Создание нового животного
  static async create(req, res, next) {
    try {
      const { petShelterId, animalTypeId, name, description, age, gender } =
        req.body;

      // Проверка на обязательные поля
      if (
        !petShelterId ||
        !animalTypeId ||
        !name ||
        !description ||
        !age ||
        !gender
      ) {
        return res
          .status(400)
          .json({ error: "Все поля обязательны для заполнения" });
      }

      if (isNaN(parseInt(age))) {
        return res.status(400).json({ error: "Age должно быть числом" });
      }

      const animal = await AnimalService.create({
        petShelterId,
        animalTypeId,
        name,
        description,
        age: parseInt(age),
        gender,
        Archived: 0,
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
      const { ID, animalTypeId, name, description, age, gender } = req.body;

      if (!ID) {
        return res
          .status(400)
          .json({ error: "Все поля обязательны для обновления" });
      }

      await AnimalsController.checkOwnership(ID, req.user.id);

      const updatedAnimal = await AnimalService.update(ID, {
        petShelterId: req.user.id,
        animalTypeId,
        name,
        description,
        age,
        gender,
      });
      return res.status(200).json(updatedAnimal);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при обновлении животного", message: e.message });
    }
  }

  // Удаление животного
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ error: "ID животного обязателен для удаления" });
      }

      await AnimalsController.checkOwnership(id, req.user.id);

      await AnimalService.delete(parseInt(id));
      return res.status(200).json({ message: "Животное успешно удалено" });
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при удалении животного", message: e.message });
    }
  }

  static async checkOwnership(animalId, petShelterId) {
    const animal = await AnimalService.getById(parseInt(animalId));

    if (!animal) {
      throw new Error("Животное с указанным ID не найдено");
    }

    if (animal.PetShelter.id !== petShelterId) {
      throw new Error("У вас нет прав на управление этим животным");
    }

    return true;
  }
}
