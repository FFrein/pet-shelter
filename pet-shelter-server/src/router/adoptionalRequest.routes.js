import express from "express";
import { AdoptionRequestController } from "../controller/adoptionalRequest.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /adoption-requests:
 *   post:
 *     summary: Создать новую заявку на усыновление
 *     description: Создает новую заявку на усыновление животного
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animalId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 2
 *               isProcessed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Заявка успешно создана
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", roleMiddleware(["user"]), AdoptionRequestController.create);

/**
 * @swagger
 * /adoption-requests:
 *   get:
 *     summary: Получить все заявки на усыновление
 *     description: Возвращает список всех заявок на усыновление
 *     responses:
 *       200:
 *         description: Список заявок
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   animalId:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   isProcessed:
 *                     type: boolean
 */
router.get("/", AdoptionRequestController.getAll);

/**
 * @swagger
 * /adoption-requests/{id}:
 *   get:
 *     summary: Получить заявку на усыновление по ID
 *     description: Возвращает заявку на усыновление по указанному ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID заявки
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заявка найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID:
 *                   type: integer
 *                 animalId:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 isProcessed:
 *                   type: boolean
 *       404:
 *         description: Заявка не найдена
 */
router.get(
  "/:id",
  roleMiddleware(["shelterManager", "user"]),
  AdoptionRequestController.getById
);

/**
 * @swagger
 * /adoption-requests/{id}:
 *   put:
 *     summary: Обновить заявку на усыновление
 *     description: Обновляет данные заявки на усыновление
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID заявки
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animalId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               isProcessed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Заявка успешно обновлена
 *       404:
 *         description: Заявка не найдена
 */
router.put(
  "/:id",
  roleMiddleware(["shelterManager"]),
  AdoptionRequestController.update
);

/**
 * @swagger
 * /adoption-requests/{id}:
 *   delete:
 *     summary: Удалить заявку на усыновление
 *     description: Удаляет заявку на усыновление по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID заявки
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заявка успешно удалена
 *       404:
 *         description: Заявка не найдена
 */
router.delete(
  "/:id",
  roleMiddleware(["admin"]),
  AdoptionRequestController.delete
);

export { router };
