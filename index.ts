import { Bot, Context } from "grammy";
import dotenv from "dotenv";
import { commands } from "./shared/config/commands";
import { connectDB } from "./server";
import getAyatFromMessage from "./lib/getAyatFromMessage";
import getSurahInfo from "./lib/getSurahInfo";
import { changeAudioCallbackQuery } from "./lib/commands/settingsCommand";

dotenv.config();
connectDB();

const bot = new Bot("7704481319:AAGVQ824udgtSbP2VRCUC9SaLp1v5U-shnM");

bot.api.setMyCommands(commands).catch((err) => console.log(`Commands error: ${err}`));

commands.map((command) => {
  bot.command(command.command, command.action);
  bot.callbackQuery(command.command, command.action);
});

bot.callbackQuery("change_audio", changeAudioCallbackQuery);

bot.on("message:text", async (ctx: Context) => {
  const message = ctx.message?.text;
  const surahAyatRegex = /^\d+:\d+(-\d+)?$/;
  const surahRegex = /^(11[0-4]|10[0-9]|[1-9][0-9]?)$/;
  if (message) {
    if (surahAyatRegex.test(message)) {
      await getAyatFromMessage(ctx);
    } else if (surahRegex.test(message)) {
      await getSurahInfo(ctx);
    } else {
      ctx.reply(
        "<b>Я не понимаю ваш запрос!</b>\n\nЗагляните в /menu и введите верный запрос.",
        { parse_mode: "HTML" }
      );
    }
  }
});

// getAyatDaily(bot)

bot.start();
