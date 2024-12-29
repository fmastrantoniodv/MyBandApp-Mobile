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
    const [selectedItem, setSelectedItem] = useState(null)
    const [playing, setPlaying] = useState(false)
    
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
    
    const onPlaybackFav = (fav) => {
        setSelectedItem(fav)
    }

    return (
        <Screen withHeader={true}>
            <Loader loading={loading} />
            <GenericModal openModal={isOpenModal} closeModal={closeModal} textBody={textBody} positiveBtn={closeModal}/>
            <View style={styles.container}>
                <CardFavs favs={favs} onPlaybackItem={onPlaybackFav} playing={playing} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
                {
                    selectedItem && <AudioPlayer selectedItem={selectedItem} playing={playing} onPlaying={setPlaying}/>
                }
                
            </View>
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