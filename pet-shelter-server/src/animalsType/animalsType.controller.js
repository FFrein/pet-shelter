import AnimalTypeService from "./animalsType.service.js";

export default class AnimalTypeController {
  static async getAll(req, res) {
    try {
      const animalTypes = await AnimalTypeService.getAll();
      return res.status(200).json(animalTypes);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении типов животных",
        message: error.message,
      });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const animalType = await AnimalTypeService.getById(id);
      if (!animalType) {
        return res.status(404).json({ error: "Тип животного не найден" });
      }
      return res.status(200).json(animalType);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при получении типа животного",
        message: error.message,
      });
    }
  }

  static async create(req, res) {
    const { TypeName, Description } = req.body;
    try {
      if (!TypeName || !Description) {
        return res
          .status(400)
          .json({ error: "Не все обязательные поля заполнены" });
      }
      const animalType = await AnimalTypeService.create({
        TypeName,
        Description,
      });
      return res.status(201).json(animalType);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при создании типа животного",
        message: error.message,
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { TypeName, Description } = req.body;
    try {
      if (!TypeName || !Description) {
        return res
          .status(400)
          .json({ error: "Не все обязательные поля заполнены" });
      }
      const updatedAnimalType = await AnimalTypeService.update(id, {
        TypeName,
        Description,
      });
      return res.status(200).json(updatedAnimalType);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при обновлении типа животного",
        message: error.message,
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedAnimalType = await AnimalTypeService.delete(id);
      return res.status(200).json(deletedAnimalType);
    } catch (error) {
      return res.status(500).json({
        error: "Ошибка при удалении типа животного",
        message: error.message,
      });
    }
  }
}
