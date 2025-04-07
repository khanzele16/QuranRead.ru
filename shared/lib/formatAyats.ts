import { Context } from "grammy";

interface IFormatAyat {
  arabicText: string;
  translationText: string;
  ayatSurah: string;
}

/**
 * @description Функция форматирования аятов, с аудио и без
 */

async function formatAyats(
  ctx: Context,
  ayats: IFormatAyat[]
): Promise<void> {
  const textMessage = ayats
    .map(({ arabicText, translationText, ayatSurah }) => {
      return `<blockquote>${arabicText}\n\n${translationText}\n\n<i>${ayatSurah}</i></blockquote>`;
    })
    .join("\n\n");
  await ctx.reply(
    `${textMessage}\n<b><a href='https://t.me/RuQuranRead_bot'>QuranRead.ru</a> — ваш спутник в изучении Корана!</b>`,
    {
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
    }
  ).catch((err) => {
    console.log(err);
    return ctx.reply('Ошибка. Возможно количество символов превышает лимит. Извините.');
  });
}

export default formatAyats;
