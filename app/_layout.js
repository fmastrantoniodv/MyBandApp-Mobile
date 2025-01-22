import { Stack } from "expo-router"
import { View } from "react-native"
import MbaLogoSvg from '../assets/img/logo.svg'
import { SafeAreaProvider } from "react-native-safe-area-context"
import { UserProvider } from '../contexts/UserContext';
import { LibsProvider } from "../contexts/LibContext";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { BackButton, HamburgerMenuButton } from "../components/Buttons";
      
export default function Layout() {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation()
    
    const toggleMenu = useCallback(() => {
        setMenuVisible(prev => !prev)
    }, []);

    return (
        <>
            <UserProvider>
                <LibsProvider>
                    <SafeAreaProvider>
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
                                    animationEnabled: true,
                                    gestureEnabled: true
                                }}
                            />
                        </View>
                    </SafeAreaProvider>
                </LibsProvider>
            </UserProvider>
        </>
    )
}
