import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Screen } from './Screen'
import { Stack } from 'expo-router'
import { FormLogin } from './FormLogin'

export function LoginContent() {
  return (
    <Screen>
      <Stack.Screen 
          options={{
            headerShown: false
          }}
      />
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        >
        <FormLogin />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262529',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})