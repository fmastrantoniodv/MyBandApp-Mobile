import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form';
import { FormButton } from './FormButton';
import { checkVerifyCode } from '../../services/usersServ';
import { useUser } from '../../contexts/UserContext';
import { GenericModal } from '../GenericModal';
import { useModal } from '../../hooks/useModal';
import { Loader } from '../Loader';
import { FormInput } from './FormInput';
import { inputValidateOtc } from '../../constants';
import { useNavigation } from "expo-router";

export const FormVerifyCode = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [textBody, setTextBody] = useState('')
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const inputRefs = useRef({});
  const { user } = useUser()
  const navigation = useNavigation()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const resp = await checkVerifyCode(user.email, data.verify_code)
      if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)
      setLoading(false)
      router.push('/createNewPass')
    } catch (error) {
      console.log('checkVerifyCode.error=', error)
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
      <Text className='text-3xl mt-4 font-semibold'>Código de verificación</Text>
      {user && <Text className='text-lg font-normal w-12/12 p-4'>
        Ingresá el código de validación que enviamos a <Text className='font-bold'>{user.email}</Text>
      </Text>
      }      
        <View className='w-full justify-items-center px-4 py-0' style={styles.container}>
          {inputValidateOtc.map((input, index)=>{
            const isLastInput = index === inputValidateOtc.length - 1;
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
                  const nextInput = inputValidateOtc  [index + 1].name;
                  inputRefs.current[nextInput]?.focus();
                } else {
                  handleSubmit(onSubmit)();
                }
              }}
              />
            )})}
          <FormButton text="Confirmar" type="primary" onPressAction={handleSubmit(onSubmit)} />
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