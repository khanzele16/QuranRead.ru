import { Context } from "grammy";
import deleteMessageFromCallback from "../../shared/lib/deleteMessageFromCallback";
import {
  setWithAudio,
} from "../../server/controllers/settingsController";
import { formatSettings } from "../../shared/lib/formatSettings";

export default async (ctx: Context) => {
  deleteMessageFromCallback(ctx, "settings", "⚙️ Настройки");
  return formatSettings(ctx);
};

export const changeAudioCallbackQuery = async (ctx: Context) => {
  deleteMessageFromCallback(ctx, "change_audio", "Настройки аудио");
  await setWithAudio(ctx);
  return formatSettings(ctx);
};