import { Router } from "express";
import QuizController from "./controllers/QuizController";
import UserController from "./controllers/UserController";
import loginAuthorization from "./middlewares/login/loginAuthorization";
const routes = new Router();

//QUIZ
routes.get("/all", loginAuthorization.optional, QuizController.index);
routes.get(
  "/quiz/:id_pergunta",
  loginAuthorization.optional,
  QuizController.show
);
routes.post("/new-question", loginAuthorization.required, QuizController.store);
routes.delete(
  "/delete/:id_pergunta",
  loginAuthorization.required,
  QuizController.delete
);

//USER
routes.post("/login", UserController.login);
routes.post("/register", UserController.register);
routes.get("/user", loginAuthorization.required, UserController.info);
routes.get(
  "/update-historico",
  loginAuthorization.required,
  UserController.updateHistorico
);

//Dashboard
routes.get("/dashboard", loginAuthorization.required, UserController.dashboard);

export default routes;
