import { Context } from "grammy";
import deleteMessageFromCallback from "../../shared/lib/deleteMessageFromCallback";
import { returnToStartKeyboard } from "../../shared/lib/returnToStart";

export default (ctx: Context) => {
  deleteMessageFromCallback(ctx, "media", "Меню команды");
  return ctx.reply(
    `📜 <b>Отправьте номер суры и аята.</b>\n<blockquote>Например: 2:255 (для получения аята с переводом).</blockquote>\n\n🔍 <b>Введите номер суры.</b>\n<blockquote> Например: 5 (для получения информации о суре).</blockquote>\n\n<b>Примечание:</b>\nТакже вы можете выключить опцию добавления аудио к аятам.`,
    { parse_mode: "HTML", reply_markup: returnToStartKeyboard }
  );
};
