import { Context, InlineKeyboard } from "grammy";
import deleteMessageFromCallback from "../../shared/lib/deleteMessageFromCallback";
import { register } from "../../server/controllers/authController";

const inlineKeyboard = new InlineKeyboard()
  .text("📖 Меню команды", "media")
  .row()
  .text("Как использовать бот?", "use")
  .row()
  .text("⚙️ Настройки", "settings")
  .text("🆘 Помощь", "help")
  .row()
  .text("Подписаться на канал разработчика", "channel");

export default (ctx: Context) => {
  register(ctx);
  deleteMessageFromCallback(ctx, "start", "Главная");
  return ctx.reply(
    `وَعَلَيْكُمُ ٱلسَّلَامُ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ

БисмиЛляh

Приветствуем вас! Добро пожаловать в бот <b>QuranRead.ru</b> — ваш спутник в изучении Корана!

📖 <b>Читай и слушай Коран</b> — погружайся в слова Аллаха и укрепляй свою веру!

📪 <b>Получай напоминания каждый день!</b> Пусть каждое слово будет для вас источником света и мудрости.

🔗 Получайте награду и заступничество в день Суда от Корана прямо сейчас!`,
    { reply_markup: inlineKeyboard, parse_mode: "HTML" }
  );
};
