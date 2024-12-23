import Router from "express";
import { UserController } from "../authorization/user.controller.js";
import { body } from "express-validator";

const router = new Router();

// Регистрация пользователя
/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создание нового пользователя в системе
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Данные для регистрации пользователя
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "user@example.com"
 *             username:
 *               type: string
 *               example: "user123"
 *             password:
 *               type: string
 *               example: "password123"
 *             phonenumber:
 *               type: string
 *               example: "+123456789012"
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Ошибка валидации данных
 */
router.post(
  "/registration",
  body("email").isEmail(),
  body("username").isLength({ min: 3, max: 32 }),
  body("password").isLength({ min: 3, max: 32 }),
  body("phonenumber").isInt().isLength({ min: 16, max: 32 }),
  UserController.registration
);
// Логин пользователя
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Логин пользователя
 *     description: Авторизация пользователя в системе
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: Логин и пароль пользователя
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: "user123"
 *             password:
 *               type: string
 *               example: "password123"
 *     responses:
 *       200:
 *         description: Успешный логин
 *       400:
 *         description: Неверные данные
 */
router.post("/login", UserController.login);

// Логаут пользователя
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Логаут пользователя
 *     description: Выход пользователя из системы
 *     responses:
 *       200:
 *         description: Пользователь успешно вышел
 */
router.post("/logout", UserController.logout);

// Обновление данных пользователя
/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Обновление данных пользователя
 *     description: Обновить информацию о пользователе
 *     responses:
 *       200:
 *         description: Данные пользователя успешно обновлены
 */
router.get("/refresh", UserController.refresh);

export { router };
