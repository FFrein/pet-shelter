import express from "express";
import { router } from "./src/router/router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import setupSwagger from "./src/swagger.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";

const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

setupSwagger(app);

app.use("/api", router);

app.use(errorMiddleware);

app.listen(8001, () => {
  console.log("authService is listening to port 8001");
});

//TODO наебенить тесты
