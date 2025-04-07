import axios from "axios";
import { Context } from "grammy";
import { getSurahName } from "../shared/config/surahNames";
import formatAyat from "../shared/lib/formatAyat";
import { getWithAudio } from "../server/controllers/settingsController";
import formatAyats from "../shared/lib/formatAyats";

export default async (ctx: Context) => {
  try {
    const message = ctx.message?.text;
    const match = message?.match(/^(\d+):(\d+)(-(\d+))?$/);
    let ayats = [];
    if (match) {
      const surah = Number(match[1]);
      const firstAyat = Number(match[2]);
      const secondAyat = Number(match[4]);
      if (secondAyat < firstAyat) {
        return ctx.reply('Последовательность аятов неправильная.')
      }
      if (secondAyat) {
        const lengthOfAyats = secondAyat - firstAyat + 1;
        if (lengthOfAyats > 5) {
          return ctx.reply("Больше 5 аятов отправить не могу.");
        }
        for (let i = 0; i < lengthOfAyats; i++) {
          const [ayatResponse, translationResponse] = await Promise.all([
            axios.get(
              `https://api.quranhub.com/v1/ayah/${surah}:${firstAyat + i}`
            ),
            axios.get(
              `https://api.quranhub.com/v1/ayah/${surah}:${
                firstAyat + i
              }/ru.kuliev`
            ),
          ]);
          const ayatSurah = `(${getSurahName(
            translationResponse.data.data.surah.number
          )}, ${ayatResponse.data.data.surah.number}:${
            ayatResponse.data.data.numberInSurah
          })`;
          ayats.push({
            ayatSurah,
            arabicText: ayatResponse.data.data.text,
            translationText: translationResponse.data.data.text,
          });
        }
        formatAyats(ctx, ayats);
      } else {
        const [ayatResponse, translationResponse] = await Promise.all([
          axios.get(`https://api.quranhub.com/v1/ayah/${message}`),
          axios.get(`https://api.quranhub.com/v1/ayah/${message}/ru.kuliev`),
        ]);
        const withAudio = await getWithAudio(ctx);
        const ayatSurah = `(${getSurahName(
          translationResponse.data.data.surah.number
        )}, ${ayatResponse.data.data.surah.number}:${
          ayatResponse.data.data.numberInSurah
        })`;
        if (!withAudio) {
          formatAyat(
            "text",
            ctx,
            ayatResponse.data.data.text,
            translationResponse.data.data.text,
            ayatSurah
          );
          return;
        }
        const audioResponse = await axios.get(
          `https://api.quranhub.com/v1/ayah/${message}/ar.alafasy.hafs`
        );
        const audioUrl = audioResponse.data.data.audio;
        formatAyat(
          "audio",
          ctx,
          ayatResponse.data.data.text,
          translationResponse.data.data.text,
          ayatSurah,
          audioUrl
        );
      }
    }
  } catch (err) {
    console.log(err);
    return ctx.reply("Вы уверены, что такая сура и аят существуют? 🤔");
  }
};
