import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
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

export default function CardFavs({ onPlaybackItem, playing, selectedItem, setSelectedItem }) {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { user, getFavs, favs, updateFavFunc } = useUser()
    const [modalTextBody, setModalTextBody] = useState('')
    const [loading, setLoading] = useState(false)
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
            openModal()
        }
    }

    const onSubmit = async (data) =>{
        console.log('onSubmit.data', data)
    }

    const onPlaybackAction = (fav) => {
        if(selectedItem && selectedItem.id === fav.id){
            onPlaybackItem(null)
        }else{
            onPlaybackItem(fav)
        }
    }

    return(
        <View className='flex bg-white w-11/12 rounded-lg justify-start p-3 mt-5 h-4/6'
            style={selectedItem === null && styles.fullHeight}
        >
            <GenericModal 
                openModal={isOpenModal}
                closeModal={closeModal} 
                textBody={modalTextBody}
                positiveBtn={closeModal}
                />
            <Text className='text-2xl font-semibold mb-3'>
                Mis favoritos
            </Text>
            {favs && favs[0] !== undefined ?
            <FlatList
                data={favs}
                keyExtractor={(favs) => favs.id}
                renderItem={({ item, index }) => (
                    <Pressable onPress={(selectedItem && item.id === selectedItem.id) ? () => setSelectedItem(null) : () => setSelectedItem(item)}>
                        <ItemFav 
                            key={item.id} 
                            favData={item} 
                            playing={(selectedItem && item.id === selectedItem.id && playing)} 
                            onPlaybackAction={() => onPlaybackAction(item)}
                            onUnfav={() => onUnfav(item.id)}
                            selectedItem={(selectedItem && item.id === selectedItem.id)}
                            />
                    </Pressable>
                )}
            />
            :
            <Text className='text-2xl text-center m-4'>No hay favoritos agregados</Text>
            }
        </View>
    )
}

function ItemFav({ favData, playing, onPlaybackAction, onUnfav, selectedItem }) {
    useEffect(()=>{
        console.log('[ItemFav].favData=', favData)
    }, [])

    return(
            <View 
                className='flex-row border-black border-2 w-12/12 rounded-lg justify-center p-3 items-center'
                style={selectedItem && styles.selectedFav}
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
      },
    fullHeight: {
        height: 'auto'
    },
    selectedFav: {
        backgroundColor: '#cbcbcb'
    }
  })