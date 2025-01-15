import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useModal } from '../hooks/useModal';
import { GenericModal } from './GenericModal';
import { planList } from '../constants';
import { FormButton } from './Form/FormButton';
import { createNewUser, updatePlan } from '../services/usersServ';
import { GoBackButton } from './Buttons';

export default function ChangePlanCard({ type }) {
    const [isOpenModal, openModal, closeModal] = useModal(false)
    const { user, updateUserPlan } = useUser()
    const [modalTextBody, setModalTextBody] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const navigation = useNavigation()
    const [userPlan, setUserPlan] = useState(null)
    const router = useRouter()

    useEffect(() => {
        console.log('[ChangePlanCard.jsx].useEffect')
        type !== 'OB' && setUserPlan(planList.find((planItem) => planItem.value === user.plan).label)
    }, [])

    const onConfirm = async (planInfo) => {
        console.log('[ChangePlanCard.jsx].onConfirm.planInfo=', planInfo)
        setLoading(true)
        setError(false)
        try {
            const resp = await updatePlan(user.id, planInfo.value)
            console.log('updatePlan resp=', resp)
            if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)
            updateUserPlan(planInfo.value)
            setLoading(false)
            setModalTextBody('¡Modificaste tu plan con éxito!')
            openModal()
        } catch (error) {
            console.log('updatePlan.error=', error)
            setError(true)
            setModalTextBody(error.message)
            setLoading(false)
            openModal()
        }
        setLoading(false)
    }

    const onCreateUser = async () => {
        console.log('[ChangePlanCard.jsx].onCreateUser.init')
        try {
            setLoading(true)
            var newUserData = user
            newUserData.plan = selectedItem.value
            const resp = await createNewUser(newUserData)
            console.log('resp_register: ', resp)
            if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)
            setLoading(false)
            setModalTextBody('¡Usuario creado con exito!')
            openModal()
          } catch (error) {
            console.log('[ChangePlanCard].[onSubmit].catch=', error)
            setError(true)
            setModalTextBody(error.message)
            setLoading(false)
            openModal()
          }
    }

    const onAcept = () => {
        closeModal()
        if(type === 'OB'){
            router.replace('/')
        }else{
            navigation.goBack()
        }
      }

    return(
        <View className='flex w-12/12 justify-start px-1'>
            <View className='flex bg-white w-11/12 rounded-lg justify-start p-5 mt-5 flex-shrink'>
                <GenericModal 
                    openModal={isOpenModal}
                    closeModal={closeModal} 
                    textBody={modalTextBody}
                    positiveBtn={error ? closeModal : onAcept}
                    />
                {
                    type !== 'OB' ?
                    <>
                        <Text className='text-2xl font-semibold mb-3'>Cambiar plan</Text>
                        <Text className='text-lg mb-4'>Tu plan actual es <Text className='font-bold'>{userPlan}</Text>. Seleccioná el plan al que deseas cambiar.</Text>
                    </>
                    :
                    <>
                        <Text className='text-3xl text-center font-semibold mb-3'>Elegir plan</Text>
                        <Text className='text-lg mb-4'>Seleccioná el plan que deseas para tu cuenta.</Text>
                    </>
                }
                {
                    planList !== undefined ?
                        <FlatList
                        className='mb-2'
                            data={planList}
                            keyExtractor={(planList) => planList.id}
                            renderItem={({ item, index }) => (
                                <Pressable onPress={(selectedItem && item.value === selectedItem.value) ? () => setSelectedItem(null) : () => setSelectedItem(item)}>
                                    <ItemPlan 
                                        key={item.value} 
                                        planData={item} 
                                        selectedItem={(selectedItem && item.value === selectedItem.value)}
                                        />
                                </Pressable>
                            )}
                        />
                    :
                        <Text className='text-2xl text-center m-4'>No hay planes disponibles</Text>
                }
                {
                    type === 'OB' ?
                        <FormButton text="Crear usuario" type="primary" onPressAction={() => onCreateUser(selectedItem)} disable={false} />
                    :
                        <FormButton text="Confirmar plan" type="primary" onPressAction={() => onConfirm(selectedItem)} disable={false} />
                }
                <GoBackButton />
            </View>
        </View>
    )
}

function ItemPlan({ planData, selectedItem }) {
    
    return(
            <View 
                className='flex-row border-black border-2 w-12/12 rounded-lg justify-center p-2 items-center mb-1'
                style={selectedItem && styles.selectedFav}
            >
                <View className='flex-1 ml-2 flex-row h-full justify-between items-center'>
                    <Text className='text-xl flex w-4/12'>{planData.label}</Text>
                    <View className='flex-row items-center w-8/12 justify-between'>
                        <Text className='text-xl flex mr-2'>
                            {`$${formatNumberAndSplit(planData.price)[0]},`}
                            <Text className='text-lg'>
                            {`${formatNumberAndSplit(planData.price)[1]}`}
                            </Text>
                        </Text>
                        {planData.description && <Text className='text-l flex'>{`${planData.description}`}</Text>}
                    </View>
                </View>
            </View>
    )
}

function formatNumberAndSplit(number) {
    const formatted = number
        .toFixed(2) // Asegura que siempre haya dos decimales
        .replace('.', ',') // Reemplaza el punto por la coma
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Agrega el separador de miles

    // Separar la parte entera y los decimales
    const [integers, decimals] = formatted.split(',');

    return [integers, decimals] // Array con enteros y decimales
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
