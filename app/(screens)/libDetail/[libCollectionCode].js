import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Screen } from '../../../components/Screen'
import CardLibDetail from '../../../components/CardLibDetail'
import { getUserFavsServ } from '../../../services/usersServ'
import { useModal } from '../../../hooks/useModal'
import { Loader } from '../../../components/Loader'
import { GenericModal } from '../../../components/GenericModal'
import { useUser } from '../../../contexts/UserContext'
import { useLibs } from '../../../contexts/LibContext'
import { useLocalSearchParams } from 'expo-router'

export default function LibDetail() {
    const [loading, setLoading] = useState(false)
    const [lib, setLib] = useState()
    const [textBody, setTextBody] = useState('')
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { libs } = useLibs()
    const { libCollectionCode } = useLocalSearchParams()
    const { getFavs } = useUser()
    
    useEffect(() => {
        console.log('[LibDetail].useEffect')
        onLoad()
    }, [])

    const onLoad = async () => {
        setLoading(true)
        setLib(libs.filter(lib => lib.collectionCode === libCollectionCode)[0])
        await getFavs()
        setLoading(false)
    }

    return (
        <Screen withHeader={true}>
            <Loader loading={loading} />
            <GenericModal openModal={isOpenModal} closeModal={closeModal} textBody={textBody} positiveBtn={closeModal}/>
            <ScrollView contentContainerStyle={styles.container}>
                <CardLibDetail libData={lib} />
            </ScrollView>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#262529',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center'
    }
  })