import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { Screen } from './Screen'
import { Stack } from 'expo-router'
import { FormCardLogin } from './FormCardLogin'

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
        <FormCardLogin />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262529',
  },
  contentContainer: {
    alignItems: 'center',
  }
})