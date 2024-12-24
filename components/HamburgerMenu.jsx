import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Pressable } from 'react-native';
import { CloseButton } from './Buttons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUser } from '../contexts/UserContext';
import { Link, useRouter } from 'expo-router'

export function HamburgerMenu({ isVisible, toggleMenu, onOptionSelect }) {
  const insets = useSafeAreaInsets()
  const slideAnim = new Animated.Value(250)
  const { cleanSession } = useUser()
  const router = useRouter()

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 250,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isVisible])

  const closeMenu = () => {
    toggleMenu()
  }
  
  return (
    <Animated.View 
      style={[
        styles.menu, { transform: [{ translateX: slideAnim }] },
        {top: insets.top}
      ]}>
        <View className='w-12/12 p-5 flex-row justify-end'>
          <CloseButton onPressAction={() => closeMenu()}/>
        </View>
        <View style={[
          styles.menuContent
        ]}>
          <View>
            <MenuButton
              title='Cambiar contraseña'
              action={() => console.log('Nav Cambiar contraseña')}
            />
            <MenuButton
              title='Cambiar plan'
              action={() => console.log('Nav Cambiar plan')}
              last={true}
            />
          </View>
          <View>
            <MenuButton
              title='Cerrar sesión'
              action={() => {
                closeMenu()
                cleanSession()
                router.push('/login')
              }}
            />
          </View>
        </View>
      </Animated.View>
  );
}

const MenuButton = ({action, title, last}) => {
  return(
    <Pressable onPress={() => action()}>
      <Text style={[
        styles.menuOption,
        last && styles.lastOption
        ]}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 250,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    zIndex: 100, // Aseguramos que se superponga sobre otros componentes
    backgroundColor: '#fff',
  },
  menuContent: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 6
  },
  menuOption: {
    fontSize: 18,
    color: 'black',
    paddingLeft: 20,
    paddingVertical: 15,
    borderColor: '#cbcbcb',
    borderTopWidth: 1,
  },
  lastOption: {
    borderBottomWidth: 1,
  }
});
