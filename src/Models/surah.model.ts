export default interface iSurah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  title?: string;
  url?: string;
}
