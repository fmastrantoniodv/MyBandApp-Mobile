import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Screen } from '../../components/Screen'
import { ButtonGoFavs} from '../../components/CardFavs'
import CardLibs from '../../components/CardLibs'
import { getCollections } from '../../services/collectionsServ'
import { getUserFavsServ } from '../../services/usersServ'
import { useModal } from '../../hooks/useModal'
import { Loader } from '../../components/Loader'
import { GenericModal } from '../../components/GenericModal'

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [collections, setCollections] = useState()
    const [textBody, setTextBody] = useState('')
    const [isOpenModal, openModal, closeModal] = useModal(false)
    
    useEffect(() => {
      onLoad()
    }, [])

    const onLoad = async () => {
        setLoading(true)
        try {
            const respCollections = await getCollections('pro')
            console.log('respCollections: ', respCollections)
            if(respCollections.errorCode) throw new Error(respCollections.errorMessage)
            setCollections(respCollections)
        } catch (error) {
            console.log('collections.error=', error)
            setLoading(false)
            setTextBody(error.message)
            openModal()
        }
        setLoading(false)
    }


    return (
        <Screen withHeader={true}>
            <Loader loading={loading} />
            <GenericModal openModal={isOpenModal} closeModal={closeModal} textBody={textBody}/>
            <ScrollView contentContainerStyle={styles.container}>
                <ButtonGoFavs />
                <CardLibs collections={collections}/>
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