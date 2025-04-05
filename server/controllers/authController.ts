import { Context } from "grammy";
import User from "../models/User";

export const register = async (ctx: Context) => {
  try {
    const chat = ctx.chat;
    if (!chat) {
      console.log("Register - no chat");
      return;
    }
    const condidate = await User.findOne({ id: chat?.id });
    if (condidate) {
      console.log("Register - user already exists");
      return;
    }
    const user = new User({
      id: chat?.id,
      username: chat?.username,
      first_name: chat?.first_name,
    });
    user.save();
    console.log("Register - success");
    return;
  } catch (err) {
    console.log(`Register - error: ${err}`);
  }
};
