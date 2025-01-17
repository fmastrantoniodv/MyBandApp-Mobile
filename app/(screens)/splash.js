import React, { useEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import MbaLogoSvg from '../../assets/img/logo.svg'
import { View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Screen } from '../../components/Screen'

export default function Splash() {
    const showHeader = false
    const router = useRouter()
    
    useEffect(()=>{
      console.log(router.dismiss())
      if(router){
        console.log(router.dismiss())
      }
    }, [router])

    return (
        <Screen withHeader={showHeader}>
            <Stack.Screen 
                options={{
                hederShown: showHeader
                }}
            />
            <View className="flex-1 bg-white items-center justify-center" on>
              <StatusBar style="dark" />
              <MbaLogoSvg width={300} height={300}/>
            </View>
        </Screen>
    )
}
