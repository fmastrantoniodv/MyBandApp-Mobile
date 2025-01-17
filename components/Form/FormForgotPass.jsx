import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form';
import { FormButton } from './FormButton';
import { sendVerifyCode } from '../../services/usersServ';
import { useUser } from '../../contexts/UserContext';
import { GenericModal } from '../GenericModal';
import { useModal } from '../../hooks/useModal';
import { Loader } from '../Loader';
import { FormInput } from './FormInput';
import { inputsForgotPass } from '../../constants';
import { useNavigation } from "expo-router";

export const FormForgotPass = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [textBody, setTextBody] = useState('')
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const inputRefs = useRef({});
  const { saveUserData } = useUser()
  const navigation = useNavigation()

  useEffect(()=>{
    inputRefs.current = {}
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const resp = await sendVerifyCode(data.email)
      if(resp.status && resp.status !== 200){
        if(resp.errorCode && resp.errorCode === 'USR_NOT_FOUND'){
          throw new Error('No hay un usuario registrado con ese correo electrónico. Intente nuevamente.')
        }else{
          throw new Error(resp.errorDetail)
        }
      } 
      setLoading(false)
      saveUserData({email: data.email})
      router.push('/verifyCode')
    } catch (error) {
      console.log('sendVerifyCode.error=', error)
      setLoading(false)
      setTextBody(error.message)
      openModal()
    }
    setLoading(false)
  };

  return (
    <View className="w-10/12 h-300px bg-white rounded-lg border border-spacing mt-10 p-2 flex-row flex-wrap justify-center">
      <Loader loading={loading} />
      <GenericModal openModal={isOpenModal} positiveBtn={closeModal} closeModal={closeModal} textBody={textBody}/>
      <Text className='text-3xl mt-4 font-semibold' >Olvidé mi contraseña</Text>
      <Text className='text-lg font-normal w-12/12 p-4'>Ingresá tu correo electrónico registrado para enviarte un código de validación.</Text>
        <View className='w-full justify-items-center px-4 py-0' style={styles.container}>
          {inputsForgotPass.map((input, index)=>{
            const isLastInput = index === inputsForgotPass.length - 1;
            return (
              <FormInput
              key={index}
              inputObj={input} 
              control={control}
              errors={errors}
              inputRefs={inputRefs}
              isLastInput={isLastInput}
              autoCapitalize={'none'}
              refInput={(ref) => (inputRefs.current[input.name] = ref)}
              returnKeyType={isLastInput ? 'done' : 'next'}
              onSubmitEditing={() => {
                if (!isLastInput) {
                  const nextInput = inputsForgotPass  [index + 1].name;
                  inputRefs.current[nextInput]?.focus();
                } else {
                  handleSubmit(onSubmit)();
                }
              }}
              />
            )})}
          <FormButton text="Enviar código" type="primary" onPressAction={handleSubmit(onSubmit)} />
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