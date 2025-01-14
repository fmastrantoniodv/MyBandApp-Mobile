import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Stack, useFocusEffect } from 'expo-router'
import { Screen } from '../../components/Screen'
import { FormForgotPass } from '../../components/Form/FormForgotPass'

export default function ForgotPass() {
    useFocusEffect(
        useCallback(() => {
            console.log('[forgotPass.js].[useFocusEffect]')
        }, [])
    )
    const showHeader = false
    return (
        <Screen withHeader={showHeader}>
            <Stack.Screen 
                options={{
                headerShown: showHeader
                }}
            />
            <View style={styles.container} >
                <FormForgotPass />
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