import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import MbaLogoSvg from '../assets/img/logo.svg'

export function Splash() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <StatusBar style="dark" />
      <MbaLogoSvg width={300} height={300}/>
    </View>
  )
}