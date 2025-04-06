const quranVerses = [
  "2:286",
  "3:200",
  "33:35",
  "16:97",
  "20:25",
  "13:28",
  "23:1",
  "25:63",
  "3:139",
  "12:87",
  "58:11",
  "109:6",
  "5:100",
  "56:96",
];

export const randomAyatForRemind = () => {
  return quranVerses[Math.floor(Math.random() * quranVerses.length)];
};