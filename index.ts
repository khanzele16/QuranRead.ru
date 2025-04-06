import { Bot, Context } from "grammy";
import dotenv from "dotenv";
import { commands } from "./shared/config/commands";
import { connectDB } from "./server";
import getAyatFromMessage from "./lib/getAyatFromMessage";
import getSurahInfo from "./lib/getSurahInfo";
import { changeAudioCallbackQuery } from "./lib/commands/settingsCommand";
import { getAyatDaily } from "./lib/getAyatDaily";

dotenv.config();
connectDB();

const bot = new Bot(process.env.BOT_API_KEY!);

bot.api.setMyCommands(commands);

commands.map((command) => {
  bot.command(command.command, command.action);
  bot.callbackQuery(command.command, command.action);
});

bot.callbackQuery("change_audio", changeAudioCallbackQuery);

bot.on("message:text", async (ctx: Context) => {
  const message = ctx.message?.text;
  const surahRegex = /^(11[0-4]|10[0-9]|[1-9][0-9]?)$/;
  const surahAyatRegex = /^\d+:\d+$/;
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
