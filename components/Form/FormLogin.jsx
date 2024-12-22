import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router'
import { useForm } from 'react-hook-form';
import { FormButton } from './FormButton';
import { login } from '../../services/usersServ';
import { useUser } from '../../contexts/UserContext';
import { GenericModal } from '../GenericModal';
import { useModal } from '../../hooks/useModal';
import { Loader } from '../Loader';
import MbaLogoSvg from '../../assets/img/logo.svg'
import { FormInput } from './FormInput';
import { inputsLogin } from '../../constants';

export const FormLogin = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { saveUserData } = useUser()
  const [textBody, setTextBody] = useState('')
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const inputRefs = useRef({});

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const resp = await login(data)
      console.log('resp_login: ', resp)
      if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)
      saveUserData(resp)
      setLoading(false)
      router.push('/home')
    } catch (error) {
      console.log('login.error=', error)
      setLoading(false)
      setTextBody(error.message)
      openModal()
    }
    setLoading(false)
  };

  return (
    <View className="w-10/12 h-300px bg-white rounded-lg border border-spacing mt-10 p-2 flex-row flex-wrap justify-center">
      <MbaLogoSvg width={250} height={150}/>
      <Text className='text-3xl font-semibold' >Iniciar sesión</Text>
        <Loader loading={loading} />
        <View className='w-full justify-items-center' style={styles.container}>
          <GenericModal openModal={isOpenModal} positiveBtn={closeModal} closeModal={closeModal} textBody={textBody}/>
          {inputsLogin.map((input, index)=>{
            const isLastInput = index === inputsLogin.length - 1;
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
                  const nextInput = inputsLogin[index + 1].name;
                  inputRefs.current[nextInput]?.focus();
                } else {
                  handleSubmit(onSubmit)();
                }
              }}
              />
            )})}
          <Link href="/home" className='text-black text-center text-lg mb-7'>Olvide mi contraseña</Link>
          <FormButton text="Ingresar" type="primary" onPressAction={handleSubmit(onSubmit)} />
          <FormButton text="Registrarse" type="secondary" onPressAction={() => {router.push('/register')}} />
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