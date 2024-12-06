import { View, Text, Pressable } from 'react-native'

export default function CardFavs() {
    return(
        <Pressable className='flex w-11/12'>
            <View className='flex bg-white rounded-lg h-12 justify-center pl-3 mt-5'>
                <Text className='text-2xl font-semibold'>
                    Mis favoritos
                </Text>
            </View>
        </Pressable>
    )
}