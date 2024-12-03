import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import MbaLogoSvg from './assets/img/logo.svg'

export default function App() {
  return (
    <View className="bg-white items-center justify-center">
      <StatusBar style="auto" />
      <MbaLogoSvg width={300} height={300}/>
      <Text>My band app</Text>
    </View>
  )
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
})
*/