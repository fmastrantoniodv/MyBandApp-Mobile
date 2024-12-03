import { View } from "react-native";
import { StatusBar } from 'expo-status-bar'

export function Screen({ children }) {
    return (
        <View
            className='flex-1 bg-grey mt-4'
        >
            <StatusBar style="dark" />
            {children}
        </View>
    )
}