import express from "express";
import { AnimalDiseasesController } from "../animalDiseases/animalsDiseases.contoller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /animal-diseases:
 *   post:
 *     summary: Создать связь между животным и заболеванием
 *     description: Создает новую связь между животным и заболеванием
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
 *               diseasesId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.post(
  "/",
  roleMiddleware(["shelterMnager", "admin"]),
  AnimalDiseasesController.create
);

/**
 * @swagger
 * /animal-diseases:
 *   get:
 *     summary: Получить все записи
 *     description: Возвращает список всех записей
 *     responses:
 *       200:
 *         description: Список записей
 */
router.get("/", AnimalDiseasesController.getAll);

/**
 * @swagger
 * /animal-diseases/{id}:
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
router.get("/:id", AnimalDiseasesController.getById);

/**
 * @swagger
 * /animal-diseases/{id}:
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
 *               animalId:
 *                 type: integer
 *               diseasesId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Запись успешно обновлена
 */
router.put(
  "/:id",
  roleMiddleware(["shelterMnager", "admin"]),
  AnimalDiseasesController.update
);

/**
 * @swagger
 * /animal-diseases/{id}:
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
  roleMiddleware(["shelterMnager", "admin"]),
  AnimalDiseasesController.delete
);

export { router };
