import axios from "axios";
import { Context } from "grammy";
import { getSurahName } from "../shared/config/surahNames";
import formatAyat from "../shared/lib/formatAyat";

export default async (ctx: Context) => {
  try {
    const message = ctx.message?.text;
    const [ayatResponse, translationResponse, audioResponse] =
      await Promise.all([
        axios.get(`https://api.quranhub.com/v1/ayah/${message}`),
        axios.get(`https://api.quranhub.com/v1/ayah/${message}/ru.kuliev`),
        axios.get(
          `https://api.quranhub.com/v1/ayah/${message}/ar.alafasy.hafs`
        ),
      ]);
    const ayatSurah = `(${getSurahName(
      translationResponse.data.data.surah.number
    )}, ${ayatResponse.data.data.surah.number}:${
      ayatResponse.data.data.numberInSurah
    })`;
    const audioUrl = audioResponse.data.data.audio;
    formatAyat(
      "audio",
      ctx,
      ayatResponse.data.data.text,
      translationResponse.data.data.text,
      ayatSurah,
      audioUrl
    );
  } catch (err) {
    console.log(err);
    return ctx.reply("Вы уверены, что такая сура и аят существуют? 🤔");
  }
};
