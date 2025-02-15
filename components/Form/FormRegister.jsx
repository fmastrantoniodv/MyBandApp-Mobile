import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form';
import { FormButton } from './FormButton';
import { useUser } from '../../contexts/UserContext.js';
import { inputsRegister } from '../../constants';
import { FormInput } from './FormInput';
import { GoBackButton } from '../Buttons.jsx';
import { GenericModal } from '../GenericModal.jsx';
import { useModal } from '../../hooks/useModal.js';

export const FormRegister = () => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm();
  const router = useRouter()
  const inputRefs = useRef({});
  const { saveUserData } = useUser()
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [textBody, setTextBody] = useState('')

  const onSubmit = async (data) => {
    if(data.email !== data.repemail){
      setTextBody('Los campos de email no coinciden')
      openModal()
      return
    }
    if(data.password !== data.reppassword){
      setTextBody('Los campos de contraseña no coinciden')
      openModal()
      return
    }
    const body = {
      "usrName": data.name,
      "email": data.email,
      "password": data.password,
      "plan": ''
    }
    saveUserData(body)
    router.push('/selectPlan')
  };  

  return (
  <View className="w-10/12 h-300px bg-white rounded-lg border border-spacing mt-10 p-2 flex-row flex-wrap justify-center">
    <Text className='text-3xl font-semibold mt-5' >Registrarse</Text>
      <View className='w-full justify-items-center' style={styles.container}>
        <GenericModal 
          openModal={isOpenModal} 
          positiveBtn={closeModal}
          closeModal={closeModal} 
          textBody={textBody}
        />
        {inputsRegister.map((input, index)=>{
          const isLastInput = index === inputsRegister.length - 1;
          return (
            <FormInput
              key={index}
              autoCapitalize={input.name === 'name' ? 'sentences' : 'none'}
              inputObj={input} 
              control={control}
              errors={errors}
              inputRefs={inputRefs}
              isLastInput={isLastInput}
              refInput={(ref) => (inputRefs.current[input.name] = ref)}
              returnKeyType={isLastInput ? 'done' : 'next'}
              onSubmitEditing={() => {
                if (!isLastInput) {
                  const nextInput = inputsRegister[index + 1].name;
                  inputRefs.current[nextInput]?.focus();
                } else {
                  handleSubmit(onSubmit)();
                }
              }}
              />
          )
        })
        }
        <FormButton text="Continuar" type="primary" disable={isValid ? false : true} onPressAction={handleSubmit(onSubmit)}/>
        <GoBackButton />
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
