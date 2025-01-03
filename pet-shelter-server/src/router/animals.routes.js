import AnimalsController from "../animals/animals.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import Router from "express";

const router = new Router();

// Получить все животные
/**
 * @swagger
 * /animals:
 *   get:
 *     summary: Получить список всех животных
 *     description: Получение всех животных из базы данных
 *     responses:
 *       200:
 *         description: Список животных
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
 *                   AnimalTypeId:
 *                     type: integer
 *                   PetShelterId:
 *                     type: integer
 */
router.get("/", AnimalsController.search);

// Получить животное по ID
/**
 * @swagger
 * /animals/{id}:
 *   get:
 *     summary: Получить животное по ID
 *     description: Получение информации о животном из базы данных по его идентификатору.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Идентификатор животного
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о животном
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
 *                 AnimalTypeId:
 *                   type: integer
 *                 PetShelterId:
 *                   type: integer
 *       400:
 *         description: Некорректный запрос
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Некорректный ID. Пожалуйста, укажите правильный ID.
 *       404:
 *         description: Животное не найдено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Животное с таким ID не найдено
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ошибка при получении животного
 *                 message:
 *                   type: string
 */
router.get("/:id", AnimalsController.getById);

// Создание нового животного
/**
 * @swagger
 * /animals:
 *   post:
 *     summary: Создать новое животное
 *     description: Добавление нового животного в базу данных
 *     parameters:
 *       - in: body
 *         name: animal
 *         description: Данные для создания животного
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             animalTypeId:
 *               type: integer
 *               example: 1
 *             petShelterId:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: "Барсик"
 *             description:
 *               type: string
 *               example: "Кошка, возраст 3 года"
 *     responses:
 *       201:
 *         description: Животное успешно создано
 *       400:
 *         description: Ошибка при создании животного
 */
router.post("/", roleMiddleware(["shelterManager"]), AnimalsController.create);

// Обновить данные животного
/**
 * @swagger
 * /animals:
 *   put:
 *     summary: Обновить данные животного
 *     description: Обновление данных животного по ID
 *     parameters:
 *       - in: body
 *         name: animal
 *         description: Обновленные данные животного
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             ID:
 *               type: integer
 *               example: 1
 *             animalTypeId:
 *               type: integer
 *               example: 1
 *             petShelterId:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: "Барсик"
 *             description:
 *               type: string
 *               example: "Кошка, возраст 3 года"
 *     responses:
 *       200:
 *         description: Данные животного успешно обновлены
 *       400:
 *         description: Ошибка при обновлении данных животного
 */
router.put("/", roleMiddleware(["shelterManager"]), AnimalsController.update);

/**
 * @swagger
 * /animals/{id}:
 *   delete:
 *     summary: Удалить животное
 *     description: Удаляет животное из базы данных по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID животного для удаления
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Животное успешно удалено
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Животное не найдено
 */
router.delete(
  "/:id",
  roleMiddleware(["shelterManager"]),
  AnimalsController.delete
);

export { router };
