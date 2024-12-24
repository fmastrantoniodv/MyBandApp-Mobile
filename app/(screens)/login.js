import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { Screen } from '../../components/Screen'
import { LoginContent } from '../../components/LoginContent'

export default function Login() {
    useEffect(()=>{
        console.log('[login.js].useEffect')
    })
    const showHeader = false
    return (
        <Screen withHeader={showHeader}>
            <Stack.Screen 
                options={{
                headerShown: showHeader
                }}
            />
            <View style={styles.container} >
                <LoginContent />
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