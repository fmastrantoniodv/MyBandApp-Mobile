import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [sessionState, setSessionState] = useState(false)
    const [playingSample, setPlayingSample] = useState(null)
    const [user , setUser] = useState({
        usrName: '', 
        plan: '',
        id: '',
        email: '',
        password: '',
        projectList: [],
        registerDate: '',
        expirationPlanDate: '',
        favList: []});

    const saveUserData = async (userData) => {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          console.log('Datos guardados');
          loadUserData()
        } catch (error) {
          console.error('Error al guardar datos', error);
        }
      };
    
      const loadUserData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value) {
            setUser(JSON.parse(value));
          }
        } catch (error) {
          console.error('Error al cargar datos', error);
        }
      };
      
    const clearUser = async () => {
        try {
          await AsyncStorage.removeItem('user');
          setUser(null); // Limpia el estado local también
          console.log('Datos eliminados');
        } catch (error) {
          console.error('Error al eliminar datos', error);
        }
      };

    useEffect(()=>{
        console.log('UserProvider.useEffect.user.id=', user.id)
        if(user.id){
            setSessionState(true)
            console.log('UserProvider.useEffect.sessionState=', sessionState)
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, saveUserData, clearUser, setPlayingSample, playingSample, sessionState }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext)