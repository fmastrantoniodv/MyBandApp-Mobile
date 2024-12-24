import { Stack } from "expo-router"
import { Pressable, View, Text } from "react-native"
import MbaLogoSvg from '../assets/img/logo.svg'
import { SafeAreaProvider } from "react-native-safe-area-context"
import { UserProvider } from '../contexts/UserContext';
import { LibsProvider } from "../contexts/LibContext";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { useState } from "react";
      
export default function Layout() {
    const [menuVisible, setMenuVisible] = useState(false);

    // Función que maneja el evento de selección de una opción del menú
    const handleMenuOptionSelect = (option) => {
      console.log(`Opción seleccionada: ${option}`);
      // Aquí puedes definir lo que debe hacer cada opción
    };
  
    // Función para cerrar el menú
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
      };

    const HamburgerMenuButton = () => {
        return (
            <Pressable onPress={toggleMenu}>
                <Text className='text-2xl'>☰</Text>
            </Pressable>)
    }

    return (
        <>
            <SafeAreaProvider>
                <UserProvider>
                    <LibsProvider>
                    <HamburgerMenu 
                        isVisible={menuVisible}
                        toggleMenu={toggleMenu} 
                        onOptionSelect={handleMenuOptionSelect} 
                    /> 
                        <View className="flex-1">
                            <Stack
                                screenOptions={{
                                    headerStyle: { backgroundColor: "white"},
                                    headerTintColor: "black",
                                    headerTitle: props => <MbaLogoSvg width={70} height={70}/>,
                                    headerTitleAlign: 'center',
                                    headerRight: () => <HamburgerMenuButton />
                                }}
                            />
                        </View>
                    </LibsProvider>
                </UserProvider>
            </SafeAreaProvider>
        </>
    )
}