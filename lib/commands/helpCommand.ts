import { Context } from "grammy";
import deleteMessageFromCallback from "../../shared/lib/deleteMessageFromCallback";
import { returnToStartKeyboard } from "../../shared/lib/returnToStart";

export default (ctx: Context) => {
  deleteMessageFromCallback(ctx, "help", "🆘 Помощь");
  return ctx.reply(
    `
Наилучшей благодарностью от вас будет распространение этого бота. 

<b>АльхамдулиЛляh больше ничего не нужно от вас!</b>

<blockquote>Сообщается, что посланник Аллаха, да благословит его Аллах и приветствует, сказал: «Тот, кто не благодарит людей, не благодарит Аллаха».\n<i>Этот хадис передали Ахмад 2/258, ат-Тирмизи 1954 и Ибн Хиббан 3407 со слов Абу Хурайры.</i></blockquote>

Братья, если у вас возникли проблемы с ботом, пожалуйста, сообщайте об этом <a href='t.me/khanzele'>мне.</a>
`,
    {
      link_preview_options: {
        is_disabled: true,
      },
      parse_mode: "HTML",
      reply_markup: returnToStartKeyboard
    }
  );
};
