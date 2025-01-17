import { View } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Screen } from '../../components/Screen'
import { FormChangePass } from '../../components/Form/FormChangePass'


export default function ChangePass() {
    return (
        <Screen withHeader={true}>
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