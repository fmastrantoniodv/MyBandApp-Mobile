import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import FavIcon from '../assets/img/favIcon.svg'
import { inputSearchParams } from '../constants'
import { useRef, useState } from 'react';
import { FormInput } from './Form/FormInput'
import { useForm } from 'react-hook-form';
import { FavButton, UnfavButton, PlayButton, PauseButton } from './Buttons'

export default function CardFavs({ favs }) {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm();
    const inputRef = useRef(null);
    const [playingItemId, setPlayingItemId] = useState(null)

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
            {favs ?
                favs.map((fav) => {
                    console.log(playingItemId)
                    return <ItemFav key={fav.id} favData={fav} playing={fav.id === playingItemId} onPlaybackAction={() => onPlaybackAction(fav.id)}/>
                })
                :
                null
            }
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

function ItemFav({ favData, playing, onPlaybackAction }) {
    console.log('[ItemFav].favData=', favData)
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
                <FavButton />
            </View>
    )
}

const styles = StyleSheet.create({
    pressedStyle: {
        opacity: 0.7
      }
  })