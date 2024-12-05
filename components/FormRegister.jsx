import React, { useState} from 'react';
import { View, TextInput, Text, StyleSheet, FlatList} from 'react-native';
import { Link, useRouter } from 'expo-router'
import { useForm, Controller } from 'react-hook-form';
import { FormButton } from './FormButton';
import { login } from '../services/usersServ';
import { useUser } from '../contexts/UserContext';
import { GenericModal } from './GenericModal';
import { useModal } from '../hooks/useModal';
import { Loader } from './Loader';
import { emailRegex, passwordRegex } from '../constants';
import { inputsRegister } from '../constants';
import { FormInput } from './FormInput';

export const FormRegister = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { saveUserData } = useUser()
  const [textBody, setTextBody] = useState('')
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true)
    try {
      const resp = await login(data)
      console.log('resp_login: ', resp)
      saveUserData(resp)
      setLoading(false)
      router.push('/home')
    } catch (error) {
      setTextBody(error.response.data.errorDetail)
      setLoading(false)
      openModal()
    }
  };

  return (
  <View className="w-10/12 h-300px bg-white rounded-lg border border-spacing mt-10 p-2 flex-row flex-wrap justify-center">
    <Text className='text-3xl font-semibold mt-5' >Registrarse</Text>
      <Loader loading={loading} />
      <View className='w-full justify-items-center' style={styles.container}>
        <GenericModal openModal={isOpenModal} closeModal={closeModal} textBody={textBody}/>
        {inputsRegister.filter((value)=> value.type !== 'dropdown').map((input, index)=>(
          <FormInput
            key={index}
            inputObj={input} 
            control={control}
            errors={errors}
          />
          ))}
        <FormButton text="Ingresar" type="primary" onPressAction={handleSubmit(onSubmit)} />
        <FormButton text="Registrarse" type="secondary" onPressAction={() => {router.push('/register')}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20,
    
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10, height: '50' },
  error: { color: 'red', marginBottom: 10 },
});
