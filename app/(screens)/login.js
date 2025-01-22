import React, { useCallback, useState } from 'react'
import { View, StyleSheet, BackHandler } from 'react-native'
import { Stack, useFocusEffect } from 'expo-router'
import { Screen } from '../../components/Screen'
import { LoginContent } from '../../components/LoginContent'
import { useUser } from '../../contexts/UserContext'
import { useModal } from '../../hooks/useModal'
import { GenericModal } from '../../components/GenericModal'

export default function Login() {
    const showHeader = false
    const { cleanSession } = useUser()
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [textBody, setTextBody] = useState('')

    useFocusEffect(
        useCallback(() => {
            cleanSession()
            const backAction = () => {
                setTextBody('¿Estás seguro que deseas salir de My Band App?')
                openModal()
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
            <GenericModal openModal={isOpenModal} positiveBtn={() => BackHandler.exitApp()} negativeBtn={closeModal} closeModal={closeModal} textBody={textBody}/>
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