import { UserService } from "../services/user.service.js";

export class UserController {
  static async registration(req, res, next) {
    try {
      const { username, email, password, phonenumber } = req.body;
      const userData = await UserService.registration(
        username,
        email,
        password,
        phonenumber
      );
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);

      // Проверка, заблокирован ли пользователь
      console.log(userData);
      if (userData.user.isBanned == 1) {
        return res.status(403).json({ message: "Пользователь заблокирован" });
      }

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //TODO брать из env
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async logout(req, res, next) {
    try {
      //const { refreshToken } = req.cookies;
      //const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //TODO исправить max age рефреш куки
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async ban(req, res, next) {
    try {
      const { id, ban } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ error: "ID обязателен для обновления пользователя" });
      }

      const updatedPetShelter = await UserService.update(id, {
        isBanned: ban,
      });
      return res.status(200).json(updatedPetShelter);
    } catch (e) {
      return res.status(500).json({
        error: "Ошибка при изменении пользователя",
        message: e.message,
      });
    }
  }
}
