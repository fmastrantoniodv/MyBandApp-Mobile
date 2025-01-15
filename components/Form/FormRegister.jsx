import React, { useRef, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form';
import { FormButton } from './FormButton';
import { GenericModal } from '../GenericModal';
import { useModal } from '../../hooks/useModal';
import { useUser } from '../../contexts/UserContext.js';
import { Loader } from '../Loader';
import { inputsRegister } from '../../constants';
import { FormInput } from './FormInput';
import { GoBackButton } from '../Buttons.jsx';

export const FormRegister = () => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm();
  const [modalTextBody, setModalTextBody] = useState('')
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const inputRefs = useRef({});
  const { saveUserData } = useUser()

  const onSubmit = async (data) => {
    console.log('onSubmit.data=',data);
    const body = {
      "usrName": data.name,
      "email": data.email,
      "password": data.password,
      "plan": ''
    }
    saveUserData(body)
    router.push('/selectPlan')
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
        {inputsRegister.map((input, index)=>{
          const isLastInput = index === inputsRegister.length - 1;
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
