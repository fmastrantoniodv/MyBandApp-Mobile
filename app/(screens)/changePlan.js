import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Screen } from '../../components/Screen'
import { getUserFavsServ } from '../../services/usersServ'
import { useModal } from '../../hooks/useModal'
import { Loader } from '../../components/Loader'
import { GenericModal } from '../../components/GenericModal'
import { useUser } from '../../contexts/UserContext'
import ChangePlanCard from '../../components/ChangePlanCard'

export default function ChangePlan() {
    const [loading, setLoading] = useState(false)
    const [textBody, setTextBody] = useState('')
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { user } = useUser()
    
    useEffect(() => {
      console.log('[ChangePlan.js].useEffect')
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
                <ChangePlanCard />
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