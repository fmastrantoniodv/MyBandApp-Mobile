import { View } from 'react-native'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import { Screen } from '../../components/Screen'
import { Link } from 'expo-router'

export default function Home() {
        return (
        <View className="flex-1">
            <Screen withHeader={true}>
                <ScrollView className="bg-white">
                    <Text>Esta es la home</Text>
                    <Link href="/" className='text-blue-400 text-xl'>Ir al login</Link>
                </ScrollView>
            </Screen>
        </View>
    )
}