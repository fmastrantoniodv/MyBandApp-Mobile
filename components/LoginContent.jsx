import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FormLogin } from './Form/FormLogin'

export function LoginContent() {
  return (
      <View style={styles.container} >
        <FormLogin />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262529',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})