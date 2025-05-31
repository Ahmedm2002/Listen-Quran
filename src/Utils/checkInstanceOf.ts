import iJuzz from '../Models/juzz.model';
import iSurah from '../Models/surah.model';

function isSurahOrJuzz(obj: iSurah | iJuzz) {
  if (obj?.transliteration || obj?.total_verses || obj?.type) {
    return 'juzz';
  }
  if (obj?.range || obj?.arabic || obj?.english) {
    return 'surah';
  }
}

export default isSurahOrJuzz;
