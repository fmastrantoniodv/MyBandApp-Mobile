import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Screen } from '../../components/Screen'
import CardFavs from '../../components/CardFavs'
import { getUserFavsServ } from '../../services/usersServ'
import { useModal } from '../../hooks/useModal'
import { Loader } from '../../components/Loader'
import { GenericModal } from '../../components/GenericModal'
import { useUser } from '../../contexts/UserContext'

export default function Favs() {
    const [loading, setLoading] = useState(false)
    const [favs, setFavs] = useState()
    const [textBody, setTextBody] = useState('')
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { user } = useUser()
    
    useEffect(() => {
      onLoad()
    }, [])

    const onLoad = async () => {
        setLoading(true)
        try {
            const respFavs = await getUserFavsServ(user.id)
            if(respFavs.errorCode) throw new Error(respFavs.errorMessage)
            setFavs(respFavs.data)
            setLoading(false)
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
                <CardFavs favs={favs}/>
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