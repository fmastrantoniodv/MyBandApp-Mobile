import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateFav } from '../services/usersServ';
import { getUserFavsServ } from '../services/usersServ'
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [sessionState, setSessionState] = useState()
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
        loadUserData()
      } catch (error) {
        console.error('Error al guardar datos', error);
      }
    }

    const saveFavsData = async (favsData) => {
      try {
        await AsyncStorage.setItem('favs', JSON.stringify(favsData));
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

    const updateFavFunc = async (sampleId, actionCode, sampleObj) => {
        try {
            const resUpdateFav = await updateFav(user.id, sampleId, actionCode)
            if(actionCode === 'UNFAV'){
              setFavs(favs.filter(fav => fav.id !== sampleId))
            }else if(actionCode === 'FAV'){
              setFavs(prevFavs => [...prevFavs, sampleObj])
            }
            if(resUpdateFav.status && resUpdateFav.status !== 200) throw new Error(resUpdateFav.errorDetail)
            return 'SUCCESS'
        } catch (error) {
            console.log('[UserContext].[unfav].catch=', error)
            if(actionCode === 'UNFAV'){
              setFavs(prevFavs => [...prevFavs, sampleObj])
            }else if(actionCode === 'FAV'){
              setFavs(favs.filter(fav => fav.id !== sampleId))
            }
            console.log('[UserContext].[unfav].rollback local.favs=', favs)
            return 'ERROR'
        }
    }

    const getFavs = async () => {
            try {
                if(!user.id) return
                const respFavs= await getUserFavsServ(user.id)
                if(respFavs.status && respFavs.status !== 200) throw new Error(respFavs.errorDetail);
                saveFavsData(respFavs)
            } catch (error) {
                console.log('favs.error=', error)
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

      const clearFavs = async () => {
        try {
          await AsyncStorage.removeItem('favs');
          setFavs(null); // Limpia el estado local también
        } catch (error) {
          console.error('Error al eliminar favs', error);
        }
      };
      
    const clearUser = async () => {
        try {
          await AsyncStorage.removeItem('user');
          setUser(null); // Limpia el estado local también
        } catch (error) {
          console.error('Error al eliminar info User', error);
        }
      };

    const updateUserPlan = (newPlan) => {
      var userData = user
      userData.plan = newPlan
      saveUserData(userData)
    }

    const isFav = (sampleId) => {
      if(favs){
        var result = favs.some(sample => sampleId === sample.id)
        return result
      }else{
        return false
      }
    }

    const cleanSession = () => {
      setSessionState(false)
      clearFavs()
      clearUser()
    }

    useEffect(()=>{
      if(user){
          setSessionState(true)
        }else{
          cleanSession()
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user, saveUserData, clearUser, setPlayingSample, playingSample, sessionState, favs, saveFavsData, isFav, getFavs, updateFavFunc, cleanSession, updateUserPlan }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext)