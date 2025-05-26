import React, {useEffect, useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Pages/Home';
import SurahPage from './src/Pages/surahPage';
import JuzzPage from './src/Pages/JuzzPage';
import {setUpPlayer} from './MusicService/service';
import {ActivityIndicator} from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let isSetup = await setUpPlayer();

    setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    console.log('Player not ready yet', isPlayerReady);
  } else {
    console.log('Player ready: ', isPlayerReady);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SurahPage"
              component={SurahPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="juzzPage"
              component={JuzzPage}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default App;
