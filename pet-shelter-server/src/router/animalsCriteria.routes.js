import express from "express";
import { AnimalCriteriaController } from "../controller/animalCriteria.controller.js";

const router = express.Router();

// Routes for AnimalCriteria
/**
 * @swagger
 * /animal-criteria:
 *   get:
 *     summary: Получить все связи животных и критериев
 *     description: Возвращает список всех связей
 *     responses:
 *       200:
 *         description: Список связей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   AnimalId:
 *                     type: integer
 *                   CriteriaId:
 *                     type: integer
 */
router.get("/", AnimalCriteriaController.getAll);

/**
 * @swagger
 * /animal-criteria/{id}:
 *   get:
 *     summary: Получить связь по ID
 *     description: Возвращает связь по указанному ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID связи
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Связь найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID:
 *                   type: integer
 *                 AnimalId:
 *                   type: integer
 *                 CriteriaId:
 *                   type: integer
 *       404:
 *         description: Связь не найдена
 */
router.get("/:id", AnimalCriteriaController.getById);

/**
 * @swagger
 * /animal-criteria/animal/{id}:
 *   get:
 *     summary: Получить связь по AnimalId
 *     description: Возвращает связь по указанному AnimalId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID связи
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Связь найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID:
 *                   type: integer
 *                 AnimalId:
 *                   type: integer
 *                 CriteriaId:
 *                   type: integer
 *       404:
 *         description: Связь не найдена
 */
router.get("/animal/:id", AnimalCriteriaController.getByAnimalId);

/**
 * @swagger
 * /animal-criteria:
 *   post:
 *     summary: Создать новую связь
 *     description: Создает новую связь между животным и критерием
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animalId:
 *                 type: integer
 *               criteriaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Связь успешно создана
 */
router.post("/", AnimalCriteriaController.create);

/**
 * @swagger
 * /animal-criteria/{id}:
 *   put:
 *     summary: Обновить связь
 *     description: Обновляет данные связи
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID связи
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
 *               criteriaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Связь успешно обновлена
 */
router.put("/:id", AnimalCriteriaController.update);

/**
 * @swagger
 * /animal-criteria/{id}:
 *   delete:
 *     summary: Удалить связь
 *     description: Удаляет связь между животным и критерием по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID связи
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Связь успешно удалена
 */
router.delete("/:id", AnimalCriteriaController.delete);

export { router };
