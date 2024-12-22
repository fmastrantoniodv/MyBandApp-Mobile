import { inputSearchParams } from '../constants'
import { cloneElement, useRef } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { FormInput } from './Form/FormInput'
import { useForm } from 'react-hook-form';
import arrowIcon from '../assets/img/arrow.png'
import Constants from 'expo-constants';
import { useRouter } from 'expo-router'
const { ENDPOINT_BACKEND } = Constants.expoConfig.extra;

export default function CardLibs({ collections }) {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm();
    const inputRef = useRef(null);
    
    const onSubmit = async (data) =>{
        console.log('onSubmit.data', data)
    }

    console.log('[CardLibs].collections',collections)

    return(
        <View className='flex bg-white w-11/12 rounded-lg justify-center p-3 mt-5'>
            <Text className='text-2xl font-semibold'>
                Librerías
            </Text>
            <FormInput 
                inputObj={inputSearchParams} 
                control={control} 
                errors={errors} 
                refInput={inputRef}
                returnKeyType={'done'}
                onSubmitEditing={() => handleSubmit(onSubmit)()}
            />
            {collections ?
                collections.map((item) => {
                    return <ItemLib key={item.id} libData={item}/>
                })
                :
                null
            }
        </View>
    )
}

function ItemLib({ libData }) {
    const srcImg = `${ENDPOINT_BACKEND}/api/collections/src/${libData.collectionCode}`
    const router = useRouter()
    return(
        <Pressable onPress={() => {router.push(`/libDetail/${libData.collectionCode}`)}} >
            {({ pressed }) => (
            <View 
                className='flex-row border-black border-2 w-12/12 rounded-lg justify-center p-3 items-center'
                style={pressed && styles.pressedStyle}
            >
                <Image source={{uri:srcImg}} className='rounded-lg' width={70} height={70} />
                <View className='flex-1 ml-2 flex-col h-full'>
                    <Text className='text-xl font-semibold flex-1'>{libData.collectionName}</Text>
                    <View className='flex-row overflow-hidden'>
                        {libData.tags.map((tag)=>{
                            return <Text key={tag} className='bg-slate-400 p-1 rounded-xl mr-2 text-sm'>{tag}</Text>
                        })}
                    </View>
                </View>
                <Image source={arrowIcon} className='flex' width={30} height={30}/>
            </View>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressedStyle: {
        opacity: 0.7
      }
  })