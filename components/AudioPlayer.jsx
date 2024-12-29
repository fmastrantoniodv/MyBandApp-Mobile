import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';  // Cambia esta importación
import { ENDPOINT_SRC } from '../constants'
import { PlayButton, PauseButton, RewindButton, FowardButton } from './Buttons'

export const AudioPlayer = ({ playingItem }) => {
  const sound = useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioUrl= `${ENDPOINT_SRC}/api/samples/${playingItem.collectionCode}/${playingItem.sampleName}`

  // Cargar el archivo de audio
  const loadAudio = async () => {
    setIsLoading(true)
    try {
      const audioSource = await sound.current.loadAsync(
        { uri: audioUrl },
        { shouldPlay: false }
      )
      console.log('[AudioPlayer.jsx].loadAudio.audioSource=', audioSource)
      sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setDuration(audioSource.durationMillis / 1000); // convertir milisegundos a segundos
      autoPlayOnLoad()
    } catch (error) {
      console.error('Error al cargar el audio:', error);
    }
    setIsLoading(false);
  }

  // Actualizar estado con la información de la reproducción
  const onPlaybackStatusUpdate = (status) => {
    console.log('onPlaybackStatusUpdate.status=', new Date().getTime())
    
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000); // convertir milisegundos a segundos
    }
  };

  // Iniciar o pausar el audio
  const togglePlayback = async () => {
    if (isPlaying) {
      await sound.current.pauseAsync();
    } else {
      await sound.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const autoPlayOnLoad = async () => {
    await sound.current.playAsync();
    setIsPlaying(true)
  }

  // Retroceder 10 segundos
  const rewind = async () => {
    const newPosition = Math.max(position - 10, 0)
    await sound.current.setPositionAsync(newPosition * 1000)
    setPosition(newPosition);
  };

  // Adelantar 10 segundos
  const fastForward = async () => {
    const newPosition = Math.min(position + 10, duration)
    await sound.current.setPositionAsync(newPosition * 1000)
    setPosition(newPosition);
  };

  // Formatear tiempo en minutos:segundos
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  };

  // Cargar el audio al montar el componente
  useEffect(() => {
    console.log('[AudioPlayer.jsx].useEffect.audioUrl=', audioUrl)
    loadAudio()
    // Limpiar el audio al desmontar el componente
    return () => {
      sound.current.unloadAsync();
    };
  }, [audioUrl]);

  return (
    <View className="flex bg-white w-11/12 rounded-lg justify-center p-3 bottom-10 border-10 h-1/4">
      <Text className='text-lg font-medium text-center mb-3'>{`${playingItem.sampleName} - ${playingItem.collectionName}`}</Text>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <>
            <Slider
                style={styles.slider}
                value={position}
                minimumValue={0}
                maximumValue={duration}
                onValueChange={(value) => {
                  console.log('onValueChange.value=', value)
                  console.log('onValueChange.position=', position)
                }}
                onSlidingComplete={(value) => {
                  console.log('onSlidingComplete.value=', value)
                  console.log('onSlidingComplete.position=', position)
                  setPosition(value)
                  sound.current.setPositionAsync(value * 1000); // Cambiar posición en el audio
                }}
            />
            <Text className='text-center text-lg mb-2'>
                {formatTime(position)} / {formatTime(duration)}
            </Text>
            <View className="flex-row justify-center items-center">
                <RewindButton onPressAction={rewind}/>
                {
                    isPlaying ?
                    <PauseButton onPressAction={togglePlayback}/>
                    :
                    <PlayButton onPressAction={togglePlayback}/>
                }
                <FowardButton onPressAction={fastForward}/>
            </View>          
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  time: {
    fontSize: 18,
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});