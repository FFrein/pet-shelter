import Router from "express";

import { router as animalTypeRouter } from "./animalType.routes.js";
import { router as animalRouter } from "./animals.routes.js";
import { router as petShelterRouter } from "./petShelter.routes.js";
import { router as userRouter } from "./user.routes.js";
import { router as DiseasesRouter } from "./disease.routes.js";
import { router as AnimalTypeDiseasesRouter } from "./animalTypeDiseases.routes.js";
import { router as AnimalDiseasesRouter } from "./animalDiseases.routes.js";
import { router as AdoptionRequestRouter } from "./adoptionalRequest.routes.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

export const router = new Router();

router.use("/user", userRouter);
router.use("/animal-type", animalTypeRouter);
router.use("/animals", animalRouter);
router.use("/petshelters", petShelterRouter);
router.use("/diseases", DiseasesRouter);
router.use("/animal-type-diseases", AnimalTypeDiseasesRouter);
router.use("/animal-diseases", AnimalDiseasesRouter);
router.use("/adoption-requests", authMiddleware(), AdoptionRequestRouter);

//TODO сделать проверки на то что число является числом
