import { View } from 'react-native'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Screen } from '../../components/Screen'
import CardFavs from '../../components/CardFavs'
import CardLibs from '../../components/CardLibs'

export default function Home() {
        return (
        <View className="flex-1">
            <Screen withHeader={true}>
                <ScrollView contentContainerStyle={styles.container}>
                    <CardFavs />
                    <CardLibs />
                </ScrollView>
            </Screen>
        </View>
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