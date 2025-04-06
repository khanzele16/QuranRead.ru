import { Context } from "grammy";

/**
 * @description Функция форматирования аятов, с аудио и без
 */

// Перегрузки функции
async function formatAyat(
  format: "text",
  ctx: Context,
  arabicText: string,
  translationText: string,
  ayatSurah: string
): Promise<void>;

async function formatAyat(
  format: "audio",
  ctx: Context,
  arabicText: string,
  translationText: string,
  ayatSurah: string,
  audioUrl: string
): Promise<void>;

async function formatAyat(
  format: "text" | "audio" = "text",
  ctx: Context,
  arabicText: string,
  translationText: string,
  ayatSurah: string,
  audioUrl?: string
): Promise<void> {
  switch (format) {
    case "text":
      await ctx.reply(
        `<blockquote>${arabicText}\n\n${translationText}\n\n<i>${ayatSurah}</i></blockquote>\n<b><a href='https://t.me/RuQuranRead_bot'>QuranRead.ru</a> — ваш спутник в изучении Корана!</b>`,
        { parse_mode: "HTML", link_preview_options: { is_disabled: true } }
      );
      break;
    case "audio":
      if (!audioUrl) {
        throw new Error("audioUrl is required when format is 'audio'");
      }
      const caption = `<blockquote>${arabicText}\n\n${translationText}\n\n<i>${ayatSurah}</i></blockquote>\n<b><a href='https://t.me/RuQuranRead_bot'>QuranRead.ru</a> — ваш спутник в изучении Корана!</b>`;
      if (caption.length >= 1024) {
        await ctx.replyWithAudio(audioUrl);
        ctx.reply(caption, {
          parse_mode: "HTML",
          link_preview_options: { is_disabled: true },
        });
      } else {
        await ctx.replyWithAudio(audioUrl, {
          caption: caption,
          parse_mode: "HTML",
        });
      }
      break;
  }
}

export default formatAyat;
