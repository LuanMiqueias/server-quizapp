import { Schema, model } from "mongoose";

const CreateQuizSchema = new Schema({
  titulo: String,
  descricao: String,
  tags: Array,
  perguntas: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
export default model("Quiz", CreateQuizSchema);
