import { useNavigation } from "expo-router";
import Constants from 'expo-constants';
const { ENDPOINT_BACKEND, TIMEOUT_SERVICES } = Constants.expoConfig.extra;

export const ENDPOINT_SRC = ENDPOINT_BACKEND

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const passwordRegex = /^[a-zA-Z0-9]{8,}$/
export const numberRegex = /^[0-9]{8}$/
export const planList = [
    { "label": "Free", "value": "free", "price": 0.00, "description": null },
    { "label": "Trial", "value": "trial", "price": 0.00, "description": "Por 1 mes" },
    { "label": "Pro" , "value": "pro", "price": 10000.00, "description": "Mensual" }
]

export const inputsForgotPass = [
    {
        title: 'Correo electrónico',
        name: 'email',
        type: 'email',
        required: {
            value: true,
            message: 'Por favor ingrese su correo electrónico'
        },
        pattern: { value: emailRegex, message: 'Formato de email inválido' }
    }
]

export const inputsLogin = [
    {
        title: 'Correo electrónico',
        name: 'email',
        type: 'email',
        required: {
            value: true,
            message: 'Por favor ingrese su correo electrónico'
        },
        pattern: { value: emailRegex, message: 'Formato de email inválido' }
    },
    {
        title: 'Contraseña',
        name: 'password',
        type: 'password',
        required: {
            value: true,
            message: 'Por favor ingrese su contraseña'
        },
        pattern: { value: passwordRegex, message: 'Formato de contraseña inválido' }
    }

];

export const inputsRegister = [
    {
        title: 'Nombre',
        name: 'name',
        type: 'text',
        required: {
            value: true,
            message: 'El campo nombre no puede ser vacío'
        }
    },
    {
        title: 'Correo electrónico',
        name: 'email',
        type: 'email',
        required: {
            value: true,
            message: 'El campo correo electrónico no puede ser vacío'
        },
        pattern: { value: emailRegex, message: 'Formato de email inválido' }
    },
    {
        title: 'Repita correo electrónico',
        name: 'repemail',
        type: 'email',
        required: {
            value: true,
            message: 'El campo correo electrónico no puede ser vacío'
        },
        pattern: { value: emailRegex, message: 'Formato de email inválido' }
    },
    {
        title: 'Contraseña',
        name: 'password',
        type: 'password',
        required: {
            value: true,
            message: 'El campo contraseña no puede ser vacío'
        },
        pattern: { value: passwordRegex, message: 'Formato de contraseña inválido' }
    },
    {
        title: 'Repita Contraseña',
        name: 'reppassword',
        type: 'password',
        required: {
            value: true,
            message: 'Campo obligatorio'
        },
        pattern: { value: passwordRegex, message: 'Formato de contraseña inválido' }
    },
    {
        title: 'Plan',
        name: 'plan',
        type: 'dropdown',
        options: planList
    }
]

export const inputsChangePass = [
    {
        title: 'Contraseña actual',
        name: 'currentPassword',
        type: 'password',
        required: {
            value: true,
            message: 'Por favor ingrese su contraseña actual'
        },
        pattern: { value: passwordRegex, message: 'La contraseña debe ser alfanumérica de al menos 8 caracteres' },
        autoComplete: 'new-password'
    },
    {
        title: 'Ingrese contraseña',
        name: 'firstPassword',
        type: 'password',
        required: {
            value: true,
            message: 'El campo no puede ser vacío'
        },
        pattern: { value: passwordRegex, message: 'La contraseña debe ser alfanumérica de al menos 8 caracteres' },
        autoComplete: 'new-password'
    },
    {
        title: 'Repita su contraseña',
        name: 'secondPassword',
        type: 'password',
        required: {
            value: true,
            message: 'El campo no puede ser vacío'
        },
        pattern: { value: passwordRegex, message: 'La contraseña debe ser alfanumérica de al menos 8 caracteres' },
        autoComplete: 'new-password'
    }
];

export const inputValidateOtc = [
    {
        title: 'Código de verificación recibido',
        name: 'verify_code',
        type: 'number',
        required: {
            value: true,
            message: 'El campo no puede estar vacío'
        },
        pattern: { value: numberRegex, message: 'El código no tiene un formato válido'},
        autocomplete: 'off'
    }
]

export const inputsNewPass = [
    {
        title: 'Ingrese contraseña',
        name: 'firstPassword',
        type: 'password',
        required: {
            value: true,
            message: 'El campo no puede ser vacío'
        },
        pattern: { value: passwordRegex, message: 'La contraseña debe ser alfanumérica de al menos 8 caracteres' },
        autoComplete: 'new-password'
    },
    {
        title: 'Repita su contraseña',
        name: 'secondPassword',
        type: 'password',
        required: {
            value: true,
            message: 'El campo no puede ser vacío'
        },
        pattern: { value: passwordRegex, message: 'La contraseña debe ser alfanumérica de al menos 8 caracteres' },
        autoComplete: 'new-password'
    }
];
