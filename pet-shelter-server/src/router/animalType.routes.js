import express from "express";
import AnimalTypeController from "../animalsType/animalsType.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /animaltypes:
 *   get:
 *     summary: Получить все типы животных
 *     description: Возвращает список всех типов животных
 *     responses:
 *       200:
 *         description: Список типов животных
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   TypeName:
 *                     type: string
 *                   Description:
 *                     type: string
 */
router.get("/", AnimalTypeController.getAll);

/**
 * @swagger
 * /animaltypes/{id}:
 *   get:
 *     summary: Получить тип животного по ID
 *     description: Возвращает тип животного по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID типа животного
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Тип животного найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID:
 *                   type: integer
 *                 TypeName:
 *                   type: string
 *                 Description:
 *                   type: string
 *       404:
 *         description: Тип животного не найден
 */
router.get("/:id", AnimalTypeController.getById);

/**
 * @swagger
 * /animaltypes:
 *   post:
 *     summary: Создать новый тип животного
 *     description: Создает новый тип животного
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TypeName:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Тип животного успешно создан
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", roleMiddleware(["admin"]), AnimalTypeController.create);

/**
 * @swagger
 * /animaltypes/{id}:
 *   put:
 *     summary: Обновить тип животного по ID
 *     description: Обновляет данные типа животного
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID типа животного
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TypeName:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Тип животного успешно обновлен
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Тип животного не найден
 */
router.put("/:id", roleMiddleware(["admin"]), AnimalTypeController.update);

/**
 * @swagger
 * /animaltypes/{id}:
 *   delete:
 *     summary: Удалить тип животного по ID
 *     description: Удаляет тип животного по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID типа животного
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Тип животного успешно удален
 *       404:
 *         description: Тип животного не найден
 */
router.delete("/:id", roleMiddleware(["admin"]), AnimalTypeController.delete);

export { router };
