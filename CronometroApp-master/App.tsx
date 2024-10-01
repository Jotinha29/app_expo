import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Cronometro from './src/components/Timer';

const MainApp = () => {
  return (
    <View style={styles.container}>
      <Cronometro />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b7280', // bg-gray-500 no Tailwind
  }
});

export default MainApp;
