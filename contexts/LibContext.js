import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LibsContext = createContext();

export const LibsProvider = ({ children }) => {
    const [playingSample, setPlayingSample] = useState(null)
    const [libs , setLibs] = useState(null);

    const saveLibsData = async (libsData) => {
        try {
          await AsyncStorage.setItem('libs', JSON.stringify(libsData));
          loadLibsData()
        } catch (error) {
          console.error('Error al guardar datos', error);
        }
      };
    
      const loadLibsData = async () => {
        try {
          const value = await AsyncStorage.getItem('libs');
          if (value) {
            setLibs(JSON.parse(value));
          }
        } catch (error) {
          console.error('Error al cargar datos', error);
        }
      };
      
    const clearLibs = async () => {
        try {
          await AsyncStorage.removeItem('libs');
          setLibs(null); // Limpia el estado local también
        } catch (error) {
          console.error('Error al eliminar datos', error);
        }
      };

    return (
        <LibsContext.Provider value={{ libs, saveLibsData, clearLibs, setPlayingSample, playingSample }}>
            {children}
        </LibsContext.Provider>
    );
};

export const useLibs = () => useContext(LibsContext)