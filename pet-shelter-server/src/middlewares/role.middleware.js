import { TokenService } from "../authorization/token.service.js";

export function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    try {
      // Получаем токен из заголовков
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(403)
          .json({ message: "Нет доступа. Отсутствует заголовок." });
      }
      // Проверяем формат токена: "Bearer <token>"
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res
          .status(403)
          .json({ message: "Нет доступа. Неверный формат токена." });
      }
      // Валидация токена
      const userData = TokenService.validateAccessToken(token);
      if (!userData) {
        return res
          .status(403)
          .json({ message: "Нет доступа. Токен не валиден." });
      }

      // Проверка роли
      if (!allowedRoles.includes(userData.role)) {
        return res.status(403).json({ message: "Недостаточно прав." });
      }

      // Если всё ок, добавляем данные пользователя в req и продолжаем
      req.user = userData;
      next();
    } catch (e) {
      console.error(e);
      return res.status(403).json({ message: "Ошибка доступа" });
    }
  };
}
