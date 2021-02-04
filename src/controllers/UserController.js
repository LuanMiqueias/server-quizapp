import User from "../models/User";
import Quiz from "../models/Quiz";
import Historico from "../models/Historico";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async login(request, responce) {
    const { email, senha } = request.body;
    if (!email || !senha) {
      return responce.status(400).json({ menssage: "Dados Incompletos!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return responce.status(401).json({ menssage: "Falha na autenticação" });
    }
    bcrypt.compare(senha, user.senha, async (err, result) => {
      if (err) {
        return responce.status(500).send({ erro: err });
      }
      if (result) {
        const token = jwt.sign(
          {
            user_id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        return responce.status(200).json({
          token: token,
          menssage: "Autenticado com sucesso!!",
        });
      }
      return responce
        .status(409)
        .json({ menssage: "Email ou senha Invalidos" });
    });
  }

  async register(request, responce) {
    const { nome, email, senha } = request.body;
    if (!nome || !email || !senha) {
      return responce.status(400).json({ menssage: "Dados Incompletos!" });
    }
    if (await User.findOne({ email: email })) {
      return responce.status(409).json({ menssage: "Usuario já Cadastrado" });
    }
    bcrypt.hash(senha, 10, async (err, hash) => {
      if (err) {
        responce.status(500).send({ erro: err });
      }
      const user = await User.create({
        nome,
        email,
        senha: hash,
      });
      return responce.json({
        nome: user.nome,
        email: user.email,
        id: user._id,
      });
    });
  }
  async info(request, responce) {
    const { user_id } = request.user;
    const user = await User.findOne({ _id: user_id }, { senha: 0 });
    return responce.json(user);
  }
  async dashboard(request, responce) {
    const { user_id } = request.user;

    const user = await User.findOne({ _id: user_id }, { senha: 0 });
    const historico = await Historico.find({ user: user_id }).limit(2);

    const quizzes = await Quiz.find(
      { user: user_id },
      { tags: 0, perguntas: 0, user: 0 }
    );

    return responce.json({ user, quizzes, historico });
  }
  async updateHistorico(request, responce) {
    const { acertos, quiz_id } = request.body;
    if (!acertos || !quiz_id) {
      return responce.status(404);
    }
    const { user_id } = request.user;
    const quiz = await Quiz.findOne(
      { _id: quiz_id },
      { tags: 0, user: 0, descricao: 0 }
    );
    const total = Object.keys(quiz.perguntas).length;
    const historico = await Historico.create({
      acertos,
      total,
      user: user_id,
      titulo: quiz.titulo,
      quiz: quiz_id,
    });
    // await historico
    //   .populate("Quiz", "_id, titulo")
    //   .populate("User", "_id nome email")
    //   .execPolulate();
    return responce.json(historico);
  }
}

export default new UserController();
