import { ApiError } from "../exceptions/api.error.js";

export function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  // Если ошибка не ApiError, возвращаем стандартное сообщение
  return res.status(500).json({ message: "Внутренняя ошибка сервера" });
}
