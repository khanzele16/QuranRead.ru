export interface IAyatData {
  data: [
    data: {
      number: number;
      text: string;
      edition: {
        identifier: string;
        language: string;
        name: string;
        englishName: string;
        format: string;
        type: string;
        direction: string;
      };
      surah: {
        number: number;
        name: string;
        englishName: string;
        englishNameTranslation: string;
        revelationType: string;
        numberOfAyahs: number;
      };
      numberInSurah: number;
      juz: number;
      manzil: number;
      page: number;
      ruku: number;
      audio?: string;
      hizbQuarter: number;
      sajda: number;
    }
  ];
}
