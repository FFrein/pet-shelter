import PetShelterService from "./petShelter.service.js";

export default class PetShelterController {
  // Получить все приюты
  static async search(req, res, next) {
    try {
      const petShelters = await PetShelterService.getAll();
      return res.status(200).json(petShelters);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при получении приютов", message: e.message });
    }
  }

  // Создание нового приюта
  static async create(req, res, next) {
    try {
      const { name, address, email, password, description, isBanned } =
        req.body;

      // Проверка на обязательные поля
      if (!name || !address || !email || !password || !description) {
        return res
          .status(400)
          .json({ error: "Все поля обязательны для создания приюта" });
      }

      const petShelter = await PetShelterService.create({
        name,
        address,
        email,
        password,
        description,
        isBanned: 0,
      });
      return res.status(201).json(petShelter);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при создании приюта", message: e.message });
    }
  }

  // Обновить информацию о приюте
  static async update(req, res, next) {
    try {
      const { ID, name, address, email, password, description, isBanned } =
        req.body;

      // TODO изменить
      if (!ID) {
        return res
          .status(400)
          .json({ error: "Все поля обязательны для обновления приюта" });
      }

      const updatedPetShelter = await PetShelterService.update(ID, {
        name,
        address,
        email,
        password,
        description,
        isBanned,
      });
      return res.status(200).json(updatedPetShelter);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при обновлении приюта", message: e.message });
    }
  }
}
