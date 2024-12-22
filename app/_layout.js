import { Stack } from "expo-router"
import { View } from "react-native"
import MbaLogoSvg from '../assets/img/logo.svg'
import { SafeAreaProvider } from "react-native-safe-area-context"
import { UserProvider } from '../contexts/UserContext';
import { LibsProvider } from "../contexts/LibContext";
      
export default function Layout() {
    return (
        <SafeAreaProvider>
            <UserProvider>
                <LibsProvider>
                    <View className="flex-1">
                        <Stack
                            screenOptions={{
                                headerStyle: { backgroundColor: "white"},
                                headerTintColor: "black",
                                headerTitle: props => <MbaLogoSvg width={70} height={70}/>,
                            }}
                        />
                    </View>
                </LibsProvider>
            </UserProvider>
        </SafeAreaProvider>
    )
}