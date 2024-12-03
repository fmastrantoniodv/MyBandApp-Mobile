import React from 'react'
import { ScrollView, Text } from 'react-native'
import { Screen } from './Screen'
import { Link } from 'expo-router'

export function HomeContent() {
  return (
    <Screen>
      <ScrollView className="bg-white">
        <Text>Esta es la home</Text>
        <Link href="/" className='text-blue-400 text-xl'>Ir al login</Link>
      </ScrollView>
    </Screen>
  )
}