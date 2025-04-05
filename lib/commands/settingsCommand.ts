import { Context, InlineKeyboard } from "grammy";
import deleteMessageFromCallback from "../../shared/lib/deleteMessageFromCallback";
import { getWithAudio } from "../../server/controllers/settingsController";

export default async (ctx: Context) => {
  const withAudio = await getWithAudio(ctx);
  deleteMessageFromCallback(ctx, "settings", "⚙️ Настройки");
  const inlineKeyboard = new InlineKeyboard()
    .text(`${withAudio ? "Отключить" : "Включить"} аудио`, "change_audio")
    .row()
    .text("◀️ Вернуться назад", "start");
  return ctx.reply(
    `<b>⚙️ Настройки:</b>\n\nДобавлять аудио к аятам? <b>${
      withAudio ? "Включено ✅" : "Отключено ❌"
    }</b>`,
    { parse_mode: "HTML", reply_markup: inlineKeyboard }
  );
};

export const changeAudioCallbackQuery = async (ctx: Context) => {
  try {
    deleteMessageFromCallback(ctx, "change_audio", "Настройки аудио");
    await setWi
  } catch (err) {
    console.log(err);
  }
};
