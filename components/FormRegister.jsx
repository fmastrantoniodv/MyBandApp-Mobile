import React, { useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form';
import { FormButton } from './FormButton';
import { createNewUser } from '../services/usersServ';
import { GenericModal } from './GenericModal';
import { useModal } from '../hooks/useModal';
import { Loader } from './Loader';
import { inputsRegister } from '../constants';
import { FormInput } from './FormInput';
import { FormSelector } from './FormSelector';
import { planList } from '../constants';

export const FormRegister = () => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm();
  const [modalTextBody, setModalTextBody] = useState('')
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [loading, setLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  const onSubmit = async (data) => {
    console.log('onSubmit.data=',data);
    const body = {
      "usrName": data.name,
      "email": data.email,
      "password": data.password,
      "plan": selectedValue
    }
    setLoading(true)
    try {
      const resp = await createNewUser(body)
      console.log('resp_register: ', resp)
      if(resp.errorCode) throw new Error(resp)
      setLoading(false)
      setModalTextBody('¡Usuario creado con exito!')
      openModal()
    } catch (error) {
      setError(true)
      setModalTextBody('Hubo un error')
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
    <Text className='text-3xl font-semibold mt-5' >Registrarse</Text>
      <Loader loading={loading} />
      <View className='w-full justify-items-center' style={styles.container}>
        <GenericModal 
          openModal={isOpenModal}
          closeModal={onAcept} 
          textBody={modalTextBody}
          positiveBtn={error ? closeModal : onAcept}
        />
        {inputsRegister.filter((value)=> value.type !== 'dropdown').map((input, index)=>(
          <FormInput
            key={index}
            inputObj={input} 
            control={control}
            errors={errors}
          />
          ))}
          <FormSelector planList={planList} titleSelector={'Plan'} selectedValue={selectedValue} onSelect={setSelectedValue}/>
        <FormButton text="Crear usuario" type="primary" disable={isValid && selectedValue !== '' ? false : true} onPressAction={handleSubmit(onSubmit)}/>
        <FormButton text="Volver" type="secondary" onPressAction={() => {router.push('/')}} />
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
