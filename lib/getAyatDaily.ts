import { Api, Bot, Context, RawApi } from "grammy";
import { randomAyatForRemind } from "../shared/config/forReminders";

export const getAyatDaily = (bot: Bot<Context, Api<RawApi>>) => {
  const now = new Date();
  const reminderDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    1
  );

  if (reminderDate < now) {
    reminderDate.setDate(reminderDate.getDate() + 1);
  }

  const timeDifference = reminderDate.getTime() - now.getTime();
  setTimeout(async () => {
    await bot.api.sendMessage(randomAyatForRemind());
  }, timeDifference);
};
