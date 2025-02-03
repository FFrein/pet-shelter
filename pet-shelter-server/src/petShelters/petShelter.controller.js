import PetShelterService from "./petShelter.service.js";

export default class PetShelterController {
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

  static async create(req, res, next) {
    try {
      const { name, address, email, password, description, city, country } =
        req.body;

      if (
        !name ||
        !address ||
        !email ||
        !password ||
        !description ||
        !city ||
        !country
      ) {
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
        city,
        country,
      });
      return res.status(201).json(petShelter);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при создании приюта", message: e.message });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email и пароль обязательны для входа" });
      }

      const petShelterData = await PetShelterService.authenticate(
        email,
        password
      );

      if (petShelterData?.user?.isBanned == 1) {
        return res.status(403).json({ message: "Пользователь заблокирован" });
      }

      res.cookie("refreshToken", petShelterData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //TODO взять время жизни из env
        httpOnly: true,
      });
      return res.status(200).json(petShelterData);
    } catch (e) {
      return res
        .status(401)
        .json({ error: "Ошибка при авторизации", message: e.message });
    }
  }

  static async logout(req, res, next) {
    try {
      //const { refreshToken } = req.cookies;
      //await PetShelterService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Успешный выход" });
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const {
        ID,
        name,
        address,
        email,
        password,
        description,
        isBanned,
        city,
        country,
      } = req.body;

      if (!ID) {
        return res
          .status(400)
          .json({ error: "ID обязателен для обновления приюта" });
      }

      const updatedPetShelter = await PetShelterService.update(ID, {
        name,
        address,
        email,
        password,
        description,
        isBanned,
        city,
        country,
      });
      return res.status(200).json(updatedPetShelter);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при обновлении приюта", message: e.message });
    }
  }

  static async ban(req, res, next) {
    try {
      const { id, ban } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ error: "ID обязателен для обновления приюта" });
      }
      const updatedPetShelter = await PetShelterService.update(id, {
        isBanned: ban,
      });
      return res.status(200).json(updatedPetShelter);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Ошибка при обновлении приюта", message: e.message });
    }
  }
}
