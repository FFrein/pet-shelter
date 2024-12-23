import Router from "express";

import { router as animalTypeRouter } from "./animalType.routes.js";
import { router as animalRouter } from "./animals.routes.js";
import { router as petShelterRouter } from "./petShelter.routes.js";
import { router as userRouter } from "./user.routes.js";

import { roleMiddleware } from "../middlewares/role.middleware.js";

export const router = new Router();

router.use("/user", userRouter);
router.use("/animal-type", roleMiddleware(["admin"]), animalTypeRouter);
router.use("/animals", animalRouter);
router.use("/petshelters", petShelterRouter);
