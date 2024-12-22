import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateFav } from '../services/usersServ';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [sessionState, setSessionState] = useState(false)
    const [playingSample, setPlayingSample] = useState(null)
    const [favs, setFavs] = useState()
    const [user , setUser] = useState({
        usrName: '', 
        plan: '',
        id: '',
        email: '',
        password: '',
        projectList: [],
        registerDate: '',
        expirationPlanDate: '',
        favList: []}
    );
    const saveUserData = async (userData) => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        console.log('Datos guardados');
        loadUserData()
      } catch (error) {
        console.error('Error al guardar datos', error);
      }
    }

    const saveFavsData = async (favsData) => {
      try {
        await AsyncStorage.setItem('favs', JSON.stringify(favsData));
        console.log('Favs guardados');
        loadFavsData()
      } catch (error) {
        console.error('Error al guardar datos', error);
      }
    }

    const loadFavsData = async () => {
      try {
        const value = await AsyncStorage.getItem('favs');
        if (value) {
          setFavs(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error al cargar datos', error);
      }
    };

    const unFav = async (sampleId) => {
        try {
            const resUnFavServ = await updateFav(user.id, sampleId, 'UNFAV')
            console.log('resUnFavServ: ', resUnFavServ)
            if(resUnFavServ.errorCode) throw new Error(resUnFavServ)
        } catch (error) {
            console.log('[CardFavs].[onUnfav].catch=', error)
            return error
        }
    }
    
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

    const isFav = (sampleId) => {
      console.log('[isFav].sampleId=', sampleId)
      console.log('[isFav].favs=', favs)
      if(favs){
        return favs.some(sample => sampleId === sample.id)
      }else{
        return false
      }
    }

    useEffect(()=>{
        console.log('UserProvider.useEffect.user.id=', user.id)
        if(user.id){
            setSessionState(true)
            console.log('UserProvider.useEffect.sessionState=', sessionState)
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, saveUserData, clearUser, setPlayingSample, playingSample, sessionState, favs, saveFavsData, isFav }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext)