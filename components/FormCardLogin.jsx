import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MbaLogoSvg from '../assets/img/logo.svg'
import { FormLogin } from './FormLogin'

export function FormCardLogin() {
  return (
  <View className="w-10/12 h-300px bg-white rounded-lg border border-spacing mt-10 p-2 flex-row flex-wrap justify-center">
    <MbaLogoSvg width={250} height={150}/>
    <Text className='text-3xl font-semibold' >Iniciar sesión</Text>
    <FormLogin />
  </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: '16'
  }
})