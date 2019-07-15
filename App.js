import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import MovieList from './src/screens/MovieList';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MovieList/>
    </SafeAreaView>
  );
};
