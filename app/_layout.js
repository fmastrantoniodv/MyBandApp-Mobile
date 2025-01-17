import { Stack } from "expo-router"
import { View } from "react-native"
import MbaLogoSvg from '../assets/img/logo.svg'
import { SafeAreaProvider } from "react-native-safe-area-context"
import { UserProvider } from '../contexts/UserContext';
import { LibsProvider } from "../contexts/LibContext";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { useState } from "react";
import { HamburgerMenuButton, BackButton } from '../components/Buttons'
import { useNavigation } from "expo-router";
      
export default function Layout() {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation()

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }

    return (
        <>
            <SafeAreaProvider>
                <UserProvider>
                    <LibsProvider>
                    <HamburgerMenu 
                        isVisible={menuVisible}
                        toggleMenu={toggleMenu} 
                    /> 
                        <View className="flex-1">
                            <Stack
                                screenOptions={{
                                    headerStyle: { backgroundColor: "white" },
                                    headerTintColor: "black",
                                    headerTitle: props => <MbaLogoSvg width={90} height={70}/>,
                                    headerTitleAlign: 'center',
                                    headerRightContainerStyle: { justifyContent: "center" },
                                    headerRight: () => <HamburgerMenuButton onPressAction={toggleMenu}/>,
                                    headerLeft: () => <BackButton onPressAction={() => navigation.goBack()}/>,
                                    headerBackButtonDisplayMode: "minimal",
                                }}
                            />
                        </View>
                    </LibsProvider>
                </UserProvider>
            </SafeAreaProvider>
        </>
    )
}