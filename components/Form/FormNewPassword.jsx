import React, { useRef, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form';
import { FormButton } from './FormButton';
import { updatePassService } from '../../services/usersServ';
import { GenericModal } from '../GenericModal';
import { useModal } from '../../hooks/useModal';
import { Loader } from '../Loader';
import { inputsNewPass } from '../../constants';
import { FormInput } from './FormInput';
import { FormSelector } from './FormSelector';
import { useNavigation } from "expo-router";
import { useUser } from '../../contexts/UserContext';

export const FormNewPassword = () => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm();
  const [modalTextBody, setModalTextBody] = useState('')
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [loading, setLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()
  const inputRefs = useRef({});
  const navigation = useNavigation()
  const { user } = useUser()

  const onSubmit = async (data) => {
    setError(false)
    setLoading(true)
    try {
      if(data.firstPassword !== data.secondPassword) throw new Error('Las contraseñas ingresadas no coinciden');
      const resp = await updatePassService(user.email, data.firstPassword)
      if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)
      setLoading(false)
      setModalTextBody('¡Contraseña modificada con éxito!')
      openModal()
    } catch (error) {
      console.log('[FormNewPassword].[onSubmit].catch=', error)
      setError(true)
      setModalTextBody(error.message)
      setLoading(false)
      openModal()
    }
  };  

  const onAcept = () => {
    closeModal()
    router.push('/')
  }

  return (
  <View className="w-10/12 h-300px bg-white rounded-lg border border-spacing mt-10 p-2 flex-row flex-wrap justify-center">
    <Loader loading={loading} />
    <GenericModal 
        openModal={isOpenModal}
        closeModal={onAcept} 
        textBody={modalTextBody}
        positiveBtn={error ? closeModal : onAcept}
      />
    <Text className='text-3xl font-semibold mt-4' >Nueva contraseña</Text>
    <Text className='text-lg font-normal w-12/12 p-4'>Ingresá la nueva contraseña que utilizaras.</Text>
      <View className='w-full justify-items-center px-4 py-0' style={styles.container}>
        {inputsNewPass.map((input, index)=>{
          const isLastInput = index === inputsNewPass.length - 1;
          if(input.type !== 'dropdown'){
            return (
              <FormInput
                key={index}
                inputObj={input} 
                control={control}
                errors={errors}
                inputRefs={inputRefs}
                isLastInput={isLastInput}
                refInput={(ref) => (inputRefs.current[input.name] = ref)}
                returnKeyType={isLastInput ? 'done' : 'next'}
                onSubmitEditing={() => {
                  if (!isLastInput) {
                    const nextInput = inputsNewPass[index + 1].name;
                    inputRefs.current[nextInput]?.focus();
                  } else {
                    handleSubmit(onSubmit)();
                  }
                }}
                />
            )
          }else{
            return <FormSelector key={index} planList={input.options} titleSelector={input.title} selectedValue={selectedValue} onSelect={setSelectedValue}/>
          }
        })
        }
        <FormButton text="Aceptar" type="primary" onPressAction={handleSubmit(onSubmit)}/>
        <FormButton text="Volver" type="secondary" onPressAction={() => {navigation.goBack()}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10, height: '50' },
  error: { color: 'red', marginBottom: 10 },
});
