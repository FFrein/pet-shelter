import express from "express";
import { CriteriaController } from "../criteria/criteria.controller.js";

const router = express.Router();

// Routes for Criteria
/**
 * @swagger
 * /criteria:
 *   get:
 *     summary: Получить все критерии
 *     description: Возвращает список всех критериев
 *     responses:
 *       200:
 *         description: Список критериев
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
 *                   Description:
 *                     type: string
 */
router.get("/", CriteriaController.getAll);

/**
 * @swagger
 * /criteria/{id}:
 *   get:
 *     summary: Получить критерий по ID
 *     description: Возвращает критерий по указанному ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID критерия
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Критерий найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID:
 *                   type: integer
 *                 Name:
 *                   type: string
 *                 Description:
 *                   type: string
 *       404:
 *         description: Критерий не найден
 */
router.get("/:id", CriteriaController.getById);

/**
 * @swagger
 * /criteria:
 *   post:
 *     summary: Создать новый критерий
 *     description: Создает новый критерий
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Критерий успешно создан
 */
router.post("/", CriteriaController.create);

/**
 * @swagger
 * /criteria/{id}:
 *   put:
 *     summary: Обновить критерий
 *     description: Обновляет данные критерия
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID критерия
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Критерий успешно обновлен
 */
router.put("/:id", CriteriaController.update);

/**
 * @swagger
 * /criteria/{id}:
 *   delete:
 *     summary: Удалить критерий
 *     description: Удаляет критерий по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID критерия
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Критерий успешно удален
 */
router.delete("/:id", CriteriaController.delete);

export { router };
