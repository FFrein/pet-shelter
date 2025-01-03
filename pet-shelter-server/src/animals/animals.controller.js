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
      if (!ID) {
        return res
          .status(400)
          .json({ error: "Все поля обязательны для обновления" });
      }

      const updatedAnimal = await AnimalService.update(ID, {
        petShelterId,
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
  static async delete(id) {
    try {
      return await AnimalModel.delete(id);
    } catch (e) {
      throw new Error("Ошибка при удалении животного: " + e.message);
    }
  }
}
