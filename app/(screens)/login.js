import React, { useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Stack, useFocusEffect } from 'expo-router'
import { Screen } from '../../components/Screen'
import { LoginContent } from '../../components/LoginContent'
import { useUser } from '../../contexts/UserContext'

export default function Login() {
    const showHeader = false
    const { cleanSession } = useUser()
    useEffect(()=>{
        console.log('[login.js].useEffect')
    })

    useFocusEffect(
        useCallback(() => {
            console.log('[login.js].[useFocusEffect]')
            cleanSession()
        }, [])
    )

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