import { Schema, model } from "mongoose";

const CreateHistoricoSchema = new Schema({
  acertos: Number,
  total: Number,
  data: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
  },
});
export default model("Historico", CreateHistoricoSchema);
