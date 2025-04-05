import { model, Schema } from "mongoose";

const User = new Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, unique: true },
  first_name: String,
  withAudio: { type: Boolean, default: true },
});

export default model("User", User);
