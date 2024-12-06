import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Screen } from './Screen'
import { Stack } from 'expo-router'
import { FormLogin } from './Form/FormLogin'

export function LoginContent() {
  const showHeader = false
  return (
    <Screen withHeader={showHeader}>
      <Stack.Screen 
          options={{
            headerShown: showHeader
          }}
      />
      <View style={styles.container} >
        <FormLogin />
      </View>
    </Screen>
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