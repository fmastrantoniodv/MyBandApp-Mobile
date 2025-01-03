import { useCallback, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, FlatList, TextInput } from 'react-native'
import arrowIcon from '../assets/img/arrow.png'
import Constants from 'expo-constants';
import { useRouter } from 'expo-router'
import { useFocusEffect } from 'expo-router';
const { ENDPOINT_BACKEND } = Constants.expoConfig.extra;

export default function CardLibs({ collections }) {
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(collections);

    useFocusEffect(
        useCallback(() => {
            console.log('[CardLibs.jsx].[useFocusEffect]')
            setFilteredData(collections)
            setSearchText('')
        }, [])
    )

    const handleSearch = (text) => {
        setSearchText(text);
        if (text === "") {
          setFilteredData(collections);
        } else {
          const filtered = collections.filter(
            (item) => {
            const textLower = text.toLowerCase()
            return (
                item.collectionName.toLowerCase().includes(textLower) ||
                item.plan.toLowerCase().includes(textLower) || 
                item.tags.some((tag) => tag.toLowerCase().includes(textLower))
            )
          });
          setFilteredData(filtered);
        }
      };

    return(
        <View className='flex bg-white w-11/12 rounded-lg justify-center p-3 mt-5'>
            <Text className='text-2xl font-semibold'>
                Librerías
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Buscar por nombre, tags o plan"
                value={searchText}
                onChangeText={handleSearch}
            />
            {filteredData ?
                <FlatList
                    data={filteredData}
                    keyExtractor={(filteredData) => filteredData.id}
                    renderItem={({ item, index }) => (
                        <ItemLib key={item.id} libData={item}/>
                    )} 
                />
                :
                <Text className='text-2xl text-center m-4'>No hay librerias disponibles</Text>
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
    },
    input: { 
        borderWidth: 1, 
        paddingLeft: 15, 
        marginBottom: 10, 
        borderRadius: 10, 
        height: '50', 
        fontSize: 14 
    }
  })