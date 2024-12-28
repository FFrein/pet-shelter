import express from "express";
import { router } from "./src/router/router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import setupSwagger from "./src/swagger.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import dotenv from "dotenv";
dotenv.config();

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
app.options("*", cors());
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
*/

setupSwagger(app);

app.use("/api", router);

app.use(errorMiddleware);

app.listen(8001, () => {
  console.log("authService is listening to port 8001");
});

//TODO наебенить тесты
