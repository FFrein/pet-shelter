// src/routes/animalTypeDiseases.routes.js
import express from "express";
import { AnimalTypeDiseasesController } from "../controller/animalsTypeDiseases.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /animalTypeDiseases:
 *   post:
 *     summary: Создать связь между типом животного и заболеванием
 *     description: Создает новую связь между типом животного и заболеванием
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animalTypeId:
 *                 type: integer
 *                 example: 1
 *               diseasesId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.post(
  "/",
  roleMiddleware(["admin"]),
  AnimalTypeDiseasesController.create
);

/**
 * @swagger
 * /animalTypeDiseases:
 *   get:
 *     summary: Получить все записи
 *     description: Возвращает список всех записей
 *     responses:
 *       200:
 *         description: Список записей
 */
router.get("/", AnimalTypeDiseasesController.getAll);

/**
 * @swagger
 * /animalTypeDiseases/{id}:
 *   get:
 *     summary: Получить запись по ID
 *     description: Возвращает запись по указанному ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Запись найдена
 *       404:
 *         description: Запись не найдена
 */
router.get("/:id", AnimalTypeDiseasesController.getById);

/**
 * @swagger
 * /animalTypeDiseases/{id}:
 *   put:
 *     summary: Обновить запись
 *     description: Обновляет данные записи
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animalTypeId:
 *                 type: integer
 *               diseasesId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Запись успешно обновлена
 */
router.put(
  "/:id",
  roleMiddleware(["admin"]),
  AnimalTypeDiseasesController.update
);

/**
 * @swagger
 * /animalTypeDiseases/{id}:
 *   delete:
 *     summary: Удалить запись
 *     description: Удаляет запись по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Запись успешно удалена
 */
router.delete(
  "/:id",
  roleMiddleware(["admin"]),
  AnimalTypeDiseasesController.delete
);

export { router };
