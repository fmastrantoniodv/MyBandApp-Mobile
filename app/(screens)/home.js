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
import { useLibs } from '../../contexts/LibContext'
import { useUser } from '../../contexts/UserContext'

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [textBody, setTextBody] = useState('')
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { saveLibsData, libs,  } = useLibs()
    const { user, favs, saveFavsData } = useUser()

    useEffect(() => {
      onLoad()
    }, [])

    const onLoad = async () => {
        setLoading(true)
        try {
            await getFavs()
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
            console.log('respCollections: ', resp)
            if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)            
            saveLibsData(resp)
        } catch (error) {
            console.log('collections.error=', error)
            setLoading(false)
            setTextBody(error.message)
            openModal()
        }
    }

    const getFavs = async () => {
        try {
            if(!user.id) return
            const respFavs= await getUserFavsServ(user.id)
            if(respFavs.status && respFavs.status !== 200) throw new Error(respFavs.errorDetail)            
            saveFavsData(respFavs)
        } catch (error) {
            console.log('favs.error=', error)
            setLoading(false)
            setTextBody(error.message)
            openModal()
        }
    }

    return (
        <Screen withHeader={true}>
            <Loader loading={loading} />
            <GenericModal openModal={isOpenModal} closeModal={closeModal} textBody={textBody}/>
            <ScrollView contentContainerStyle={styles.container}>
                <ButtonGoFavs />
                <CardLibs collections={libs}/>
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