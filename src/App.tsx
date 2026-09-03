import React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './navigation';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider style={{ flex: 1 }}>
        <MainStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
