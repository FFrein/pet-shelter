import Router from "express";
import { UserController } from "../controller/user.controller.js";
import { body } from "express-validator";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = new Router();

// Регистрация пользователя
/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создание нового пользователя в системе
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               phonenumber:
 *                 type: string
 *                 example: "+123456789012"
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
  body("phonenumber")
    .isLength({ min: 12, max: 15 })
    .matches(/^\+\d+$/),
  UserController.registration
);

// Логин пользователя
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Логин пользователя
 *     description: Авторизация пользователя в системе
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Успешный логин
 *       400:
 *         description: Неверные данные
 */
router.post(
  "/login",
  body("email").isEmail(),
  body("password").exists(),
  UserController.login
);

// Логаут пользователя
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Логаут пользователя
 *     description: Выход пользователя из системы
 *     responses:
 *       200:
 *         description: Пользователь успешно вышел
 */
router.post("/logout", UserController.logout);

router.put("/ban", roleMiddleware(["admin"]), UserController.ban);

// Обновление данных пользователя
/**
 * @swagger
 * /user/refresh:
 *   get:
 *     summary: Обновление данных пользователя
 *     description: Обновить информацию о пользователе
 *     responses:
 *       200:
 *         description: Данные пользователя успешно обновлены
 */
router.get("/refresh", UserController.refresh);

export { router };
