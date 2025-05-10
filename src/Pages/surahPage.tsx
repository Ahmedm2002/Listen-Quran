// import axios from 'axios';
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';

// const SurahPage = ({route}: any) => {
//   const surah = route?.params?.item;
//   const surahNumber = surah?.index;

//   const [ayahs, setAyahs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const getSurahText = async () => {
//     try {
//       const response = await axios.get(
//         `http://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`,
//       );
//       setAyahs(response.data.data.ayahs);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getSurahText();
//   }, []);

//   if (!surah) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Error: Surah data not found</Text>
//       </View>
//     );
//   }

//   const isBismillahRequired = !['At-Tawbah', 'التوبة'].includes(surah.title);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>{surah.title}</Text>
//       <Text style={styles.titleAr}>{surah.titleAr}</Text>

//       <View style={styles.metaContainer}>
//         <Text style={styles.metaText}>📍 Place: {surah.place}</Text>
//         <Text style={styles.metaText}>📘 Type: {surah.type}</Text>
//         <Text style={styles.metaText}>📄 Pages: {surah.pages}</Text>
//         <Text style={styles.metaText}>🔢 Ayahs: {surah.count}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Juz Details</Text>
//         {surah.juz.map((j: any, index: number) => (
//           <View key={index} style={styles.juzRow}>
//             <Text style={styles.juzText}>Juz {j.index}</Text>
//             <Text style={styles.juzText}>
//               Verses: {j.verse.start.replace('verse_', '')} –{' '}
//               {j.verse.end.replace('verse_', '')}
//             </Text>
//           </View>
//         ))}
//       </View>

//       {/* Quran Text Display */}
//       <View style={styles.quranTextSection}>
//         <Text style={styles.sectionTitle}>📖 Surah Text</Text>

//         {loading ? (
//           <ActivityIndicator size="large" color="#2c6e49" />
//         ) : (
//           <>
//             {isBismillahRequired && surahNumber !== 1 && (
//               <Text style={styles.bismillah}>﷽</Text>
//             )}
//             {ayahs.map((ayah, index) => (
//               <Text key={index} style={styles.ayahText}>
//                 {ayah.text}{' '}
//                 <Text style={styles.ayahNumber}>﴿{ayah.numberInSurah}﴾</Text>
//               </Text>
//             ))}
//           </>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#f4f9f4',
//     flexGrow: 1,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#2c3e50',
//     textAlign: 'center',
//   },
//   titleAr: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#2c6e49',
//     textAlign: 'center',
//     marginBottom: 20,
//     fontFamily: 'Kitab-Regular',
//   },
//   metaContainer: {
//     marginBottom: 20,
//     backgroundColor: '#e9f5ee',
//     borderRadius: 10,
//     padding: 16,
//   },
//   metaText: {
//     fontSize: 16,
//     marginBottom: 4,
//     color: '#34495e',
//   },
//   section: {
//     marginTop: 10,
//     backgroundColor: '#d3eedd',
//     padding: 16,
//     borderRadius: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#2c3e50',
//   },
//   juzRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//   },
//   juzText: {
//     fontSize: 16,
//     color: '#2c3e50',
//   },
//   quranTextSection: {
//     marginTop: 20,
//     backgroundColor: '#ffffff',
//     padding: 16,
//     borderRadius: 10,
//     borderColor: '#c0c0c0',
//     borderWidth: 1,
//   },
//   bismillah: {
//     fontSize: 32,
//     textAlign: 'center',
//     color: '#4a7c59',
//     fontFamily: 'Kitab-Regular',
//     marginBottom: 24,
//   },
//   ayahText: {
//     fontSize: 26,
//     color: '#000',
//     fontFamily: 'Kitab-Regular',
//     textAlign: 'right',
//     marginBottom: 20,
//     lineHeight: 40,
//   },
//   ayahNumber: {
//     fontSize: 20,
//     backgroundColor: '#e2f0d9',
//     color: '#1c3a2d',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 16,
//     overflow: 'hidden',
//   },
// });

// export default SurahPage;

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const SurahPage = ({route}: any) => {
  const surah = route?.params?.item;
  const surahNumber = surah?.index;

  const [ayahs, setAyahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getSurahText = async () => {
    try {
      const response = await axios.get(
        `http://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`,
      );
      setAyahs(response.data.data.ayahs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSurahText();
  }, []);

  if (!surah) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Surah data not found</Text>
      </View>
    );
  }

  const isBismillahRequired = !['At-Tawbah', 'التوبة'].includes(surah.title);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{surah.title}</Text>
      <Text style={styles.titleAr}>{surah.titleAr}</Text>

      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>📍 Place: {surah.place}</Text>
        <Text style={styles.metaText}>📘 Type: {surah.type}</Text>
        <Text style={styles.metaText}>📄 Pages: {surah.pages}</Text>
        <Text style={styles.metaText}>🔢 Ayahs: {surah.count}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Juz Details</Text>
        {surah.juz.map((j: any, index: number) => (
          <View key={index} style={styles.juzRow}>
            <Text style={styles.juzText}>Juz {j.index}</Text>
            <Text style={styles.juzText}>
              Verses: {j.verse.start.replace('verse_', '')} –{' '}
              {j.verse.end.replace('verse_', '')}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.quranTextSection}>
        <Text style={styles.sectionTitle}>📖 Surah Text</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2c6e49" />
        ) : (
          <>
            {isBismillahRequired && surahNumber !== 1 && (
              <Text style={styles.bismillah}>﷽</Text>
            )}
            {ayahs.map((ayah, index) => (
              <Text key={index} style={styles.ayahText}>
                {ayah.text}{' '}
                <Text style={styles.ayahNumber}>﴿{ayah.numberInSurah}﴾</Text>
              </Text>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f9f4',
    flexGrow: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
  },
  titleAr: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2c6e49',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'KFGQPC Uthman Taha Naskh',
  },
  metaContainer: {
    marginBottom: 20,
    backgroundColor: '#e9f5ee',
    borderRadius: 10,
    padding: 16,
  },
  metaText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#34495e',
  },
  section: {
    marginTop: 10,
    backgroundColor: '#d3eedd',
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  juzRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  juzText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  quranTextSection: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  bismillah: {
    fontSize: 32,
    textAlign: 'center',
    color: '#4a7c59',
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    marginBottom: 24,
  },
  ayahText: {
    fontSize: 26,
    color: '#000',
    fontFamily: 'KFGQPC Uthman Taha Naskh',
    textAlign: 'right',
    marginBottom: 20,
    lineHeight: 40,
  },
  ayahNumber: {
    fontSize: 20,
    backgroundColor: '#e2f0d9',
    color: '#1c3a2d',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default SurahPage;
