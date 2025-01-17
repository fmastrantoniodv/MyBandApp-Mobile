import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from 'expo-router'
import { useForm } from 'react-hook-form';
import { FormButton } from './FormButton';
import { changePassService } from '../../services/usersServ';
import { useUser } from '../../contexts/UserContext';
import { GenericModal } from '../GenericModal';
import { useModal } from '../../hooks/useModal';
import { Loader } from '../Loader';
import { FormInput } from './FormInput';
import { inputsChangePass } from '../../constants';

export const FormChangePass = () => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm();
  const [textBody, setTextBody] = useState('')
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigation = useNavigation()
  const inputRefs = useRef({});
  const { user } = useUser()

  const onSubmit = async (data) => {
    setLoading(true)
    setError(false)
    try {
      if(data.firstPassword !== data.secondPassword) throw new Error('Las nuevas contraseñas no coinciden')
      const resp = await changePassService(user.email, data.currentPassword, data.secondPassword)
      if(resp.status && resp.status !== 200) throw new Error(resp.errorDetail)
      setLoading(false)
      setTextBody('¡Modificaste tu contraseña con éxito!')
      openModal()
    } catch (error) {
      console.log('changePassService.error=', error)
      setError(true)
      setTextBody(error.message)
      setLoading(false)
      openModal()
    }
    setLoading(false)
  };

  const onAcept = () => {
    closeModal()
    navigation.goBack()
  }

  return (
    <View className="w-12/12 flex-col self-center items-center">
      <Text className='text-3xl font-semibold mb-5' >Cambiar contraseña</Text>
        <Loader loading={loading} />
        <View className='w-full flex-col p-2 justify-between'>
          <GenericModal 
            openModal={isOpenModal} 
            positiveBtn={error ? closeModal : onAcept}
            closeModal={closeModal} 
            textBody={textBody}
          />
          {inputsChangePass.map((input, index)=>{
            const isLastInput = index === inputsChangePass.length - 1;
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
                    const nextInput = inputsChangePass[index + 1].name;
                    inputRefs.current[nextInput]?.focus();
                  } else {
                    handleSubmit(onSubmit)();
                  }
                }}
              />
            )})}
          <FormButton text="Cambiar" type="primary" disable={!isValid} onPressAction={handleSubmit(onSubmit)} />
        </View>
      </View>
  );
};
