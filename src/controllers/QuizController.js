// import { find } from "lodash";
import Quiz from "../models/Quiz";

class SessionController {
  async index(request, responce) {
    const perguntas = await Quiz.find();

    return responce.json(perguntas);
  }
  async show(request, responce) {
    const { id_pergunta } = request.params;
    const pergunta = await Quiz.findOne({ _id: id_pergunta });
    await pergunta.populate("user", "email nome").execPopulate();

    return responce.json(pergunta);
  }
  async store(request, responce) {
    const { titulo, descricao, tags, perguntas } = request.body;
    const { user_id } = request.user;

    const pergunta = await Quiz.findOne({
      perguntas,
      titulo,
      descricao,
      user: user_id,
    });
    if (!titulo || !descricao || !perguntas || !tags) {
      return responce
        .status(400)
        .json("Todos os campos precisam ser prenchidos");
    }
    if (pergunta) {
      return responce.status(409).json("Quiz já existente!");
    }
    const NovaPergunta = await Quiz.create({
      titulo,
      descricao,
      tags,
      perguntas,
      user: user_id,
    });
    await NovaPergunta.populate("user", "email nome").execPopulate();
    return responce.json(NovaPergunta);
  }
  async delete(request, responce) {
    const { id_pergunta } = request.params;

    await Quiz.findByIdAndDelete({ _id: id_pergunta });
    return responce.send();
  }
}

export default new SessionController();
