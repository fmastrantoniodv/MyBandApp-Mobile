import React, { useCallback } from 'react'
import { View, StyleSheet, BackHandler, Alert } from 'react-native'
import { Stack, useFocusEffect } from 'expo-router'
import { Screen } from '../../components/Screen'
import { LoginContent } from '../../components/LoginContent'
import { useUser } from '../../contexts/UserContext'

export default function Login() {
    const showHeader = false
    const { cleanSession } = useUser()

    useFocusEffect(
        useCallback(() => {
            cleanSession()
            const backAction = () => {
                Alert.alert("Salir de My Band App", "¿Estás seguro de que quieres salir?", [
                    {
                        text: "Cancelar",
                        style: "cancel",
                    },
                    { text: "Salir", onPress: () => BackHandler.exitApp() },
                ])
                return true
            };
            const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => backHandler.remove();
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