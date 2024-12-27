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
import { AudioPlayer } from '../../components/AudioPlayer'


export default function Favs() {
    const [loading, setLoading] = useState(false)
    const [favs, setFavs] = useState()
    const [textBody, setTextBody] = useState('')
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { user } = useUser()
    const [playingItem, setPlayingItem] = useState(null)
    
    useEffect(() => {
      onLoad()
    }, [])

    const onLoad = async () => {
        setLoading(true)
        try {
            if(!user.id) throw new Error('No se encontro id de usuario')
            const resp = await getUserFavsServ(user.id)
            if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)
            setFavs(resp)
            setLoading(false)
        } catch (error) {
            console.log('favs.error=', error)
            setLoading(false)
            setTextBody(error.message)
            openModal()
        }
        setLoading(false)
    }

    const deleteFavFromList = (itemId) => {
        setFavs(favs.filter((fav)=>fav.id !== itemId))
    } 

    return (
        <Screen withHeader={true}>
            <Loader loading={loading} />
            <GenericModal openModal={isOpenModal} closeModal={closeModal} textBody={textBody} positiveBtn={closeModal}/>
            <ScrollView contentContainerStyle={styles.container}>
                <CardFavs favs={favs} onDeleteFav={deleteFavFromList} onPlaybackItem={setPlayingItem}/>
                {
                    playingItem && <AudioPlayer playingItem={playingItem} />
                }
                
            </ScrollView>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#262529',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  })