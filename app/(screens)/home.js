import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Screen } from '../../components/Screen'
import { ButtonGoFavs} from '../../components/CardFavs'
import CardLibs from '../../components/CardLibs'
import { getCollections } from '../../services/collectionsServ'
import { useModal } from '../../hooks/useModal'
import { Loader } from '../../components/Loader'
import { GenericModal } from '../../components/GenericModal'
import { useLibs } from '../../contexts/LibContext'
import { Stack } from 'expo-router'

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [textBody, setTextBody] = useState('')
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { saveLibsData, libs,  } = useLibs()

    useEffect(() => {
      onLoad()
    }, [])

    const onLoad = async () => {
        setLoading(true)
        try {
            await getLibs()
        } catch (error) {
            console.log('collections.error=', error)
            setLoading(false)
            setTextBody(error.message)
            openModal()
        }
        setLoading(false)
    }

    const getLibs = async () => {
        try {
            const resp = await getCollections('pro')
            if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)            
            saveLibsData(resp)
        } catch (error) {
            console.log('collections.error=', error)
            setLoading(false)
            setTextBody(error.message)
            openModal()
        }
    }

    return (
        <Screen withHeader={true}>
            <Stack.Screen 
                options={{
                    headerShown: true,
                    headerLeft: null,
                    headerBackVisible: false
                }}
            />
            <Loader loading={loading} />
            <GenericModal openModal={isOpenModal} closeModal={closeModal} textBody={textBody}/>
            <View style={styles.container}>
                <ButtonGoFavs />
                <CardLibs collections={libs}/>
            </View>
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