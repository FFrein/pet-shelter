// src/routes/disease.routes.js
import express from "express";
import { DiseaseController } from "../controller/diseases.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /diseases:
 *   post:
 *     summary: Создать новое заболевание
 *     description: Создает новое заболевание в базе данных
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Грипп"
 *               description:
 *                 type: string
 *                 example: "Инфекционное заболевание"
 *     responses:
 *       201:
 *         description: Заболевание успешно создано
 */
router.post("/", roleMiddleware(["admin"]), DiseaseController.create);

/**
 * @swagger
 * /diseases:
 *   get:
 *     summary: Получить список всех заболеваний
 *     description: Возвращает список всех заболеваний
 *     responses:
 *       200:
 *         description: Список заболеваний
 */
router.get("/", DiseaseController.getAll);

/**
 * @swagger
 * /diseases/{id}:
 *   get:
 *     summary: Получить заболевание по ID
 *     description: Возвращает заболевание по указанному ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заболевание найдено
 *       404:
 *         description: Заболевание не найдено
 */
router.get("/:id", DiseaseController.getById);

/**
 * @swagger
 * /diseases/{id}:
 *   put:
 *     summary: Обновить заболевание
 *     description: Обновляет данные заболевания
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Заболевание успешно обновлено
 */
router.put("/:id", roleMiddleware(["admin"]), DiseaseController.update);

/**
 * @swagger
 * /diseases/{id}:
 *   delete:
 *     summary: Удалить заболевание
 *     description: Удаляет заболевание по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заболевание успешно удалено
 */
router.delete("/:id", DiseaseController.delete);

export { router };
