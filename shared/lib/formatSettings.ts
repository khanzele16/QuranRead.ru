import { Context, InlineKeyboard } from "grammy";
import { getWithAudio } from "../../server/controllers/settingsController";

export async function formatSettings(ctx: Context) {
  const withAudio = await getWithAudio(ctx);
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
}
