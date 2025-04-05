import { Context } from "grammy";
import { ISurahInfo } from "../types/surah";

/**
 * @description Функция форматирования аятов, с аудио и без
 */

async function formatSurah(ctx: Context, surahInfo: ISurahInfo): Promise<void> {
  ctx.reply(
    `<b>${surahInfo.russianName}</b> (${
      surahInfo.name
    })\n<blockquote><i>Сура <b>${surahInfo.russianName}</b> находится на ${
      surahInfo.number
    } месте в Коране.\n\nВ этой суре ${
      surahInfo.numberOfAyahs
    } аятов.\n\nСура <b>${surahInfo.russianName}</b> была ниспослана в ${
      surahInfo.revelationType === "Meccan" ? "Мекке" : "Медине"
    }</i></blockquote>\n<b><a href='https://t.me/RuQuranRead_bot'>QuranRead.ru</a> — ваш спутник в изучении Корана!</b>`,
    {
      parse_mode: "HTML",
      link_preview_options: {
        is_disabled: true,
      },
    }
  );
}

export default formatSurah;
