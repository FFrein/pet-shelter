import PetShelterController from "../petShelters/petShelter.controller.js";
import Router from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = new Router();

// Получить все приюты для животных
/**
 * @swagger
 * /petshelters:
 *   get:
 *     summary: Получить список всех приютов для животных
 *     description: Получение всех приютов из базы данных
 *     responses:
 *       200:
 *         description: Список приютов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   Name:
 *                     type: string
 *                   Address:
 *                     type: string
 *                   Email:
 *                     type: string
 */
router.get("/", PetShelterController.search);

// Создание нового приюта
/**
 * @swagger
 * /petshelters:
 *   post:
 *     summary: Создать новый приют для животных
 *     description: Добавление нового приюта в базу данных
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Приют для кошек"
 *               address:
 *                 type: string
 *                 example: "Улица Животных, 10"
 *               email:
 *                 type: string
 *                 example: "shelter@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               description:
 *                 type: string
 *                 example: "Приют для бездомных кошек"
 *               city:
 *                 type: string
 *                 example: "Минск"
 *               contry:
 *                 type: string
 *                 example: "Беларусь"
 *     responses:
 *       201:
 *         description: Приют успешно создан
 */
router.post("/", PetShelterController.create);

// Авторизация приюта
/**
 * @swagger
 * /petshelters/login:
 *   post:
 *     summary: Авторизация приюта
 *     description: Авторизация существующего приюта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "shelter@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Успешная авторизация
 */
router.post("/login", PetShelterController.login);

// Логаут приюта
/**
 * @swagger
 * /petshelters/logout:
 *   post:
 *     summary: Выход из аккаунта приюта
 *     description: Завершает текущую сессию приюта, удаляя refreshToken из куки.
 *     responses:
 *       200:
 *         description: Успешный выход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Успешный выход"
 *       401:
 *         description: Пользователь не авторизован
 */
router.post("/logout", PetShelterController.logout);

//Бан приюта
router.put("/ban", roleMiddleware(["admin"]), PetShelterController.ban);

// Обновить данные приюта
/**
 * @swagger
 * /petshelters:
 *   put:
 *     summary: Обновить данные приюта
 *     description: Обновление информации о приюте
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Приют для собак"
 *               address:
 *                 type: string
 *                 example: "Улица Животных, 20"
 *               email:
 *                 type: string
 *                 example: "newemail@shelter.com"
 *               description:
 *                 type: string
 *                 example: "Приют для бездомных собак"
 *               city:
 *                 type: string
 *                 example: "Минск"
 *               contry:
 *                 type: string
 *                 example: "Беларусь"
 *     responses:
 *       200:
 *         description: Данные приюта успешно обновлены
 */
router.put("/", authMiddleware, PetShelterController.update);

export { router };
