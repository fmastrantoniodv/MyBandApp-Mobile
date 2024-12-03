import React from 'react';
import { View, TextInput, Button, Text, StyleSheet} from 'react-native';
import { Link } from 'expo-router'
import { useForm, Controller } from 'react-hook-form';
import { FormButton } from './FormButton';
import { login } from '../services/usersServ';
import { useUser } from '../contexts/UserContext';

export const FormLogin = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { setUser, clearUser } = useUser()
  const onSubmit = async (data) => {
    console.log(data);
    //setError(false)
    //openModal()
    try {
        const resp = await login(data)
        setUser(resp)
        alert(resp)
      //closeModal()
      //  navigate(routes.home)
      console.log(resp)
    } catch (error) {
        console.error('Error handleLoginSubmit: ', error)
      //  setError(true)
    }
  };

  return (
    <View className='w-full justify-items-center' style={styles.container}>
      <Controller
        name="email"
        control={control}
        rules={{ required: 'El email es obligatorio', pattern: { value: /^\S+@\S+$/i, message: 'Formato de email inválido' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text className='text-xl font-semibold'>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className='bg-gray-200 border-0'
            />
          </>
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        name="password"
        control={control}
        rules={{ required: 'La contraseña es obligatoria' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text className='text-xl font-semibold'>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className='bg-gray-200 border-0'
              />
            </>
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      <Link href="/home" className='text-black text-center text-lg mb-7'>Olvide mi contraseña</Link>
      <FormButton text="Ingresar" type="primary" onPressAction={handleSubmit(onSubmit)} />
      <FormButton text="Registrarse" type="secondary" onPressAction={handleSubmit(onSubmit)} />
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
