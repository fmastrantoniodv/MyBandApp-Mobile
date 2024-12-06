import { useRef } from 'react';
import { View, Text, Image, Pressable } from 'react-native'
import { FormInput } from './Form/FormInput'
import { useForm } from 'react-hook-form';

export default function CardLibs() {
    const inputSearchParams = 
    {
        title: 'Buscar',
        name: 'searchInput',
        type: 'text',
        required: {
            value: false,
            message: ''
        }
    }
    const { control, handleSubmit, formState: { errors, isValid } } = useForm();
    const inputRef = useRef(null);

    const onSubmit = async (data) =>{
        console.log('onSubmit.data', data)
    }

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
            <ItemLib />
        </View>
    )
}

function ItemLib() {
    return(
        <Pressable>
            <View className='flex-row border-black border-2 w-12/12 rounded-lg justify-center p-3'>
                <Image className='bg-slate-500 rounded-lg' width={70} height={70} />
                <Text className='text-xl font-semibold flex-1 ml-2'>
                    Titulo
                </Text>
            </View>
        </Pressable>
    )
}