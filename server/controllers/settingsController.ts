import { Context } from "grammy";
import User from "../models/User";

export const setWithAudio = async (ctx: Context) => {
  try {
    const chat = ctx.chat;
    const user = await User.findOne({ id: chat?.id });
    if (!user) {
      console.log("User not found");
      return false;
    }
    await user.updateOne({ withAudio: !user.withAudio });
    return !user.withAudio;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const getWithAudio = async (ctx: Context): Promise<boolean> => {
  try {
    const chat = ctx.chat;
    const user = await User.findOne({ id: chat?.id });
    if (!user) {
      console.log("User not found");
      return false;
    }
    const settingWithAudio = user.withAudio;
    return settingWithAudio;
  } catch (err) {
    console.log(`Error: ${err}`);
    return false;
  }
};
