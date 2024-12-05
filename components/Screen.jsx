import { View } from "react-native";
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Screen({ children, withHeader }) {
    const insets = useSafeAreaInsets()
    return (
        <View
            style={{paddingTop: !withHeader && insets.top}}
            className='flex-1 bg-grey'
        >
            <StatusBar style="dark" />
            {children}
        </View>
    )
}