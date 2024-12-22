import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { useRouter } from 'expo-router'
import FavIcon from '../assets/img/favIcon.svg'
import { inputSearchParams } from '../constants'
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FavButton, UnfavButton, PlayButton, PauseButton } from './Buttons'
import { updateFav } from '../services/usersServ'
import { useUser } from '../contexts/UserContext';
import { useModal } from '../hooks/useModal';
import { GenericModal } from './GenericModal';
import Constants from 'expo-constants';
import { useLibs } from '../contexts/LibContext';
const { ENDPOINT_BACKEND } = Constants.expoConfig.extra;

export default function CardLibDetail({ libData, onDeleteFav }) {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm();
    const inputRef = useRef(null);
    const [playingItemId, setPlayingItemId] = useState(null)
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { user,  favs, isFav  } = useUser()
    const [modalTextBody, setModalTextBody] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const [error, setError] = useState(false)

    useEffect(()=>{
        console.log('[CardLibDetail].useEffect')
        console.log('[CardLibDetail].libData=', libData)
    }, [libData])

    const onUnfav = async (itemId) => {
        try {
            const resUnFavServ = await updateFav(user.id, itemId, 'UNFAV')
            console.log('resUnFavServ: ', resUnFavServ)
            if(resUnFavServ.errorCode) throw new Error(resUnFavServ)
            setLoading(false)
            setModalTextBody('¡Favorito descartado!')
            onDeleteFav(itemId)
            openModal()
        } catch (error) {
            console.log('[CardFavs].[onUnfav].catch=', error)
            setError(true)
            setModalTextBody('Hubo un error')
            setLoading(false)
            openModal()
        }
    }


    const onSubmit = async (data) =>{
        console.log('onSubmit.data', data)
    }

    const onPlaybackAction = (itemId) => {
        if(playingItemId === itemId){
            setPlayingItemId(null)
        }else{
            setPlayingItemId(itemId)
        }
    }


    return(
        <View className='flex bg-white w-11/12 rounded-lg justify-center p-3 mt-5'>
            <GenericModal 
                openModal={isOpenModal}
                closeModal={closeModal} 
                textBody={modalTextBody}
                positiveBtn={closeModal}
            />
            <View className='flex-row mb-4'>
                
                    {
                        libData ?
                        <>
                            <Image
                                source={{uri:`${ENDPOINT_BACKEND}/api/collections/src/${libData.collectionCode}`}} 
                                className='rounded-lg mr-2' 
                                width={120} 
                                height={120} 
                            />
                            <View className='flex-column justify-between'>
                                <Text className='text-xl font-medium'>
                                    {libData.collectionName}
                                </Text>
                                <View className='flex-row mt-2 overflow-hidden'>
                                    {libData.tags.map((tag)=>{
                                        return <Text key={tag} className='bg-slate-400 p-1 rounded-xl mr-2 text-sm'>{tag}</Text>
                                    })}
                                </View>
                                <Text className='text-lg font-medium'>
                                    Plan: {libData.plan}
                                </Text>
                            </View>
                        </>
                    :
                    <Text>
                        Cargando
                    </Text>
                }
            </View>
            {
            libData && libData.sampleList ?
                libData.sampleList.map((sample) => {
                    return <SampleItem 
                                key={sample.id} 
                                sampleData={sample}
                                isFav={isFav(sample.id)}
                                /**
                                playing={fav.id === playingItemId} 
                                onPlaybackAction={() => onPlaybackAction(fav.id)}
                                onUnfav={() => onUnfav(fav.id)}
                                 */ 
                                />
                })
                :
                <Text className='text-2xl text-center m-4'>No hay samples en esta libreria</Text>
            }
        </View>
            )
}

function SampleItem({ sampleData, playing, onPlaybackAction, onUnfav, isFav }) {
    useEffect(()=>{
        console.log('[SampleItem].sampleData=', sampleData)
        console.log('[SampleItem].isFav=', isFav)
    }, [])

    return(
            <View 
                className='flex-row border-black border-t-2 w-12/12 justify-center py-2 items-center'
            >
                <View className='flex-1 ml-2 flex-row h-full'>
                    <View className='flex-row items-center'>
                        <Text className='text-lg font-medium flex mr-4'>{sampleData.sampleName}</Text>
                    </View>
                </View>
                {playing ?
                    <PauseButton onPressAction={onPlaybackAction} />
                    :
                    <PlayButton onPressAction={onPlaybackAction}/>
                }
                {
                    isFav ?
                    <FavButton onPressAction={onUnfav}/>
                    :
                    <UnfavButton />
                }
            </View>
    )
}

const styles = StyleSheet.create({
    pressedStyle: {
        opacity: 0.7
      }
  })