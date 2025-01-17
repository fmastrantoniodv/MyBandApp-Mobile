import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { Screen } from '../../components/Screen'
import { FormForgotPass } from '../../components/Form/FormForgotPass'

export default function ForgotPass() {
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