import React from 'react';
import { TextInput, Text, StyleSheet} from 'react-native';
import { Controller } from 'react-hook-form';

export const FormInput = ({
  inputObj, 
  control, 
  errors, 
  refInput, 
  returnKeyType, 
  onSubmitEditing
}) => {
  return ( 
    <>
      <Text className='text-xl font-semibold'>{inputObj.title}</Text>
      <Controller
        name={inputObj.name}
        control={control}
        rules={{ 
          required: inputObj.required.message, 
          pattern: inputObj.pattern
         }}
        render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInput
            style={styles.input} 
            placeholder={inputObj.title}
            onBlur={onBlur} 
            onChangeText={onChange}
            value={value}
            secureTextEntry={inputObj.type === 'password' ? true : false}
            className='bg-gray-200 border-0'
            ref={refInput}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
          />
        </>
      )}
      />
      {errors[inputObj.name] && <Text style={styles.error}>{errors[inputObj.name].message}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  container: { 
    padding: 20
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10, height: '50', fontSize: 16 },
  error: { color: 'red', marginBottom: 10 },
});
