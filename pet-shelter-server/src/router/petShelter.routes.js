import PetShelterController from "../petShelters/petShelter.controller.js";
import Router from "express";
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
 *     responses:
 *       201:
 *         description: Приют успешно создан
 */
router.post("/", PetShelterController.create);

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
 *     responses:
 *       200:
 *         description: Данные приюта успешно обновлены
 */
router.put(
  "/",
  roleMiddleware(["shelterMnager", "admin"]),
  PetShelterController.update
);

export { router };
