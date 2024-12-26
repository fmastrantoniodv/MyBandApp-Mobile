import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import FavIcon from '../assets/img/favIcon.svg'
import { inputSearchParams } from '../constants'
import { useEffect, useRef, useState } from 'react';
import { FormInput } from './Form/FormInput'
import { useForm } from 'react-hook-form';
import { FavButton, UnfavButton, PlayButton, PauseButton } from './Buttons'
import { updateFav } from '../services/usersServ'
import { useUser } from '../contexts/UserContext';
import { useModal } from '../hooks/useModal';
import { GenericModal } from './GenericModal';

export default function CardFavs({ onDeleteFav }) {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm();
    const inputRef = useRef(null);
    const [playingItemId, setPlayingItemId] = useState(null)
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { user, getFavs, favs, updateFavFunc } = useUser()
    const [modalTextBody, setModalTextBody] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        console.log('[CardFavs].useEffect')
        getFavs()
    }, [])


    const onUnfav = async (itemId) => {
        console.log('[CardLibDetail.jsx].onUnfav.itemId=', itemId)
        const resUnFav = await updateFavFunc(itemId, 'UNFAV', null)
        console.log('onUnfav: ', resUnFav)
        setLoading(false)
        if(resUnFav !== 'SUCCESS'){
            setError(true)
            setModalTextBody('Hubo un error')
            setLoading(false)
            openModal()
        }else{
            setLoading(false)
            setModalTextBody('¡Favorito descartado!')
            onDeleteFav(itemId)
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
            <Text className='text-2xl font-semibold'>
                Mis favoritos
            </Text>
            <FormInput 
                inputObj={inputSearchParams} 
                control={control} 
                errors={errors} 
                refInput={inputRef}
                returnKeyType={'done'}
                onSubmitEditing={() => handleSubmit(onSubmit)()}
            />
            {favs && favs[0] !== undefined ?
                favs.map((fav) => {
                    return <ItemFav 
                                key={fav.id} 
                                favData={fav} 
                                playing={fav.id === playingItemId} 
                                onPlaybackAction={() => onPlaybackAction(fav.id)}
                                onUnfav={() => onUnfav(fav.id)}
                                />
                })
                :
                <Text className='text-2xl text-center m-4'>No hay favoritos agregados</Text>
            }
        </View>
            )
}

function ItemFav({ favData, playing, onPlaybackAction, onUnfav }) {
    useEffect(()=>{
        console.log('[ItemFav].favData=', favData)
    }, [])

    return(
            <View 
                className='flex-row border-black border-2 w-12/12 rounded-lg justify-center p-3 items-center'
            >
                <View className='flex-1 ml-2 flex-row h-full'>
                    <View className='flex-row items-center'>
                        <Text className='text-xl flex mr-4'>{favData.sampleName}</Text>
                        <Text className='text-xs flex'>{`[${favData.collectionName}]`}</Text>
                    </View>
                </View>
                {playing ?
                    <PauseButton onPressAction={onPlaybackAction} />
                    :
                    <PlayButton onPressAction={onPlaybackAction}/>
                }
                <FavButton onPressAction={onUnfav}/>
            </View>
    )
}

export function ButtonGoFavs() {
    const router = useRouter()
    return(
        <Pressable 
            className='flex w-11/12'
            onPress={() => {router.push('/favs')}}
        >
            {({ pressed }) => (
            <View 
                className='flex-row bg-white rounded-lg h-12 justify-between items-center px-3 mt-5'
                style={pressed && styles.pressedStyle}>
                <Text className='text-2xl font-semibold'>
                    Mis favoritos
                </Text>
                <FavIcon width={25} height={25} />               
            </View>
            )
            }
        </Pressable>
    )
}


const styles = StyleSheet.create({
    pressedStyle: {
        opacity: 0.7
      }
  })