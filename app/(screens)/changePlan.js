import { View } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Screen } from '../../components/Screen'
import ChangePlanCard from '../../components/ChangePlanCard'

export default function ChangePlan() {
    return (
        <Screen withHeader={true}>
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