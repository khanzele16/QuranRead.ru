import { Context, InlineKeyboard } from "grammy";
import deleteMessageFromCallback from "../../shared/lib/deleteMessageFromCallback";

const inlineKeyboard = new InlineKeyboard()
  .url("Подписаться на канал", "https://t.me/khanzele_dev")
  .row()
  .text("◀️ Вернуться назад", "start");

export default async (ctx: Context) => {
  deleteMessageFromCallback(ctx, "channel", "Буду рад подписке 🔥");
  return ctx.reply(
    "🎉 Присоединяйтесь к нашему каналу, чтобы быть в курсе всех новостей и обновлений!\n\n🔗 Мы делимся интересными материалами, полезными советами и последними новостями.\n\n<b>🌟 @khanzele_dev — Блог о программировании</b>",
    { parse_mode: "HTML", reply_markup: inlineKeyboard }
  );
};
