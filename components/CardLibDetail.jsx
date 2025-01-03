import { View, Text, Pressable, StyleSheet, Image, FlatList } from 'react-native'
import { inputSearchParams } from '../constants'
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FavButton, UnfavButton, PlayButton, PauseButton } from './Buttons'
import { useUser } from '../contexts/UserContext';
import { useModal } from '../hooks/useModal';
import { GenericModal } from './GenericModal';
import Constants from 'expo-constants';
import { useLibs } from '../contexts/LibContext';
const { ENDPOINT_BACKEND } = Constants.expoConfig.extra;

export default function CardLibDetail({ libData, onPlaybackItem, playing, selectedItem, setSelectedItem }) {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm();
    const inputRef = useRef(null);
    const [playingItemId, setPlayingItemId] = useState(null)
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { favs, isFav, updateFavFunc } = useUser()
    const [modalTextBody, setModalTextBody] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')
    const [error, setError] = useState(false)
    const [sampleListLib, setSampleListLib] = useState(null)

    useEffect(()=>{
        console.log('[CardLibDetail].useEffect')
        console.log('[CardLibDetail].libData=', libData)
        libData && setSampleListLib(libData.sampleList)
    }, [libData])

    const onUnfav = async (itemId) => {
        console.log('[CardLibDetail.jsx].onUnfav.itemId=', itemId)
        const resUnFav = await updateFavFunc(itemId, 'UNFAV', null)
        console.log('onUnfav: ', resUnFav)
        setLoading(false)
        if(resUnFav !== 'SUCCESS'){
            setError(true)
            setModalTextBody('Hubo un error')
            openModal() 
        }
    }

    const onFav = async (itemId, itemObj) => {
        console.log(`[CardLibDetail.jsx].onfav.itemId=${itemId}`)
        itemObj.collectionName = libData.collectionName
        console.log('[CardLibDetail.jsx].onfav.itemObj: ', itemObj)
        const resFav = await updateFavFunc(itemId, 'FAV', itemObj)
        console.log('[CardLibDetail.jsx].onFav: ', resFav)
        console.log('[CardLibDetail.jsx].onFav.updatedFavs=', favs)
        setLoading(false)
        if(resFav !== 'SUCCESS'){
            setError(true)
            setModalTextBody('Hubo un error')
            openModal() 
        }
    }

    const onSubmit = async (data) =>{
        console.log('onSubmit.data', data)
    }

    const onPlaybackAction = (libItem) => {
        if(selectedItem && selectedItem.id === libItem.id){
            onPlaybackItem(null)
        }else{
            onPlaybackItem(libItem)
        }
    }

    return(
        <View className='flex bg-white w-11/12 rounded-lg justify-center p-3 mt-5'
            style={styles.fullHeight}
        >
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
            libData && sampleListLib ?
                        <FlatList
                            data={sampleListLib}
                            keyExtractor={(sampleListLib) => sampleListLib.id}
                            renderItem={({ item, index }) => (
                                <Pressable onPress={(selectedItem && item.id === selectedItem.id) ? () => setSelectedItem(null) : () => setSelectedItem(item)}>
                                    <SampleItem 
                                        isFav={favs && isFav(item.id)}
                                        key={item.id} 
                                        onFav={() => onFav(item.id, item)}
                                        onPlaybackAction={() => onPlaybackAction(item)}  
                                        onUnfav={() => onUnfav(item.id)}
                                        playing={(selectedItem && item.id === selectedItem.id && playing)}
                                        selectedItem={(selectedItem && item.id === selectedItem.id)}
                                        sampleData={item}
                                    />
                                </Pressable>
                            )}
                        />
                :
                <Text className='text-2xl text-center m-4'>No hay samples en esta libreria</Text>
            }
        </View>
            )
}

function SampleItem({ sampleData, playing, onPlaybackAction, onUnfav, onFav, isFav, selectedItem }) {
    useEffect(()=>{
        console.log('[SampleItem].sampleData=', sampleData)
        console.log('[SampleItem].isFav=', isFav)
    }, [isFav])

    return(
            <View 
                className='flex-row border-black border-t-2 w-12/12 justify-center py-2 items-center'
                style={selectedItem && styles.selectedSample}
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
                    <UnfavButton onPressAction={onFav}/>
                }
            </View>
    )
}

const styles = StyleSheet.create({
    pressedStyle: {
        opacity: 0.7
    },
    fullHeight: {
        height: 'auto'
    },
    selectedSample: {
        backgroundColor: '#E9E9E9',
        
    }
  })