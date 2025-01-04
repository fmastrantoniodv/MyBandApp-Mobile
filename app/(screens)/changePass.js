import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Screen } from '../../components/Screen'
import CardFavs from '../../components/CardFavs'
import { getUserFavsServ } from '../../services/usersServ'
import { useModal } from '../../hooks/useModal'
import { Loader } from '../../components/Loader'
import { GenericModal } from '../../components/GenericModal'
import { useUser } from '../../contexts/UserContext'
import { FormChangePass } from '../../components/Form/FormChangePass'


export default function ChangePass() {
    const [loading, setLoading] = useState(false)
    const [textBody, setTextBody] = useState('')
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { user } = useUser()
    
    useEffect(() => {
      console.log('[ChangePass.js].useEffect')
      //onLoad()
    }, [])

    const onLoad = async () => {
        setLoading(true)
        try {
            if(!user.id) throw new Error('No se encontro id de usuario')
            const resp = await getUserFavsServ(user.id)
            if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)
            setLoading(false)
        } catch (error) {
            console.log('favs.error=', error)
            setLoading(false)
            setTextBody(error.message)
            openModal()
        }
        setLoading(false)
    }

    return (
        <Screen withHeader={true}>
            <Loader loading={loading} />
            <GenericModal openModal={isOpenModal} closeModal={closeModal} textBody={textBody} positiveBtn={closeModal}/>
            <View style={styles.container}>
                <View className='flex bg-white w-11/12 rounded-lg p-3 mt-5'>
                    <FormChangePass />
                </View>
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