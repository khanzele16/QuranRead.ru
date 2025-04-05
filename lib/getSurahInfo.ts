import axios from "axios";
import { Context } from "grammy";
import { getSurahName } from "../shared/config/surahNames";
import formatSurah from "../shared/lib/formatSurah";

export default async (ctx: Context) => {
  try {
    const message = Number(ctx.message?.text);
    const { data } = await axios.get(`https://api.quranhub.com/v1/surah`);
    const russianName = getSurahName(message);
    const surahInfo = {
      ...data.data.find((surah: any) => surah.number === message),
      russianName,
    };
    formatSurah(ctx, surahInfo);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
