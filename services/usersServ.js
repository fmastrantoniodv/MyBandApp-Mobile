import axios from 'axios'
import Constants from 'expo-constants';
const { ENDPOINT_BACKEND, LOCAL_ENDPOINT_BACKEND } = Constants.expoConfig.extra;

export const createNewUser = async (data) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/users/register`
        const body = {
            "usrName": data.name,
            "email": data.email,
            "password": data.password,
            "plan": data.suscription
        }
        const response = await axios.post(url, body)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const login = async (data) => {
    try {
        const url = `${LOCAL_ENDPOINT_BACKEND}/api/users/login`
        const body = {
            "email": data.email,
            "password": data.password
        }
        console.log('url', url)
        console.log('body', body)
        const response = await axios.post(url, body)
        console.log('response=',response)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserFavsServ = async (userId) => {
    return await axios.
    get(`${ENDPOINT_BACKEND}/api/users/getUserFavsList/${userId}`)
    .then((response) => {
        const data = response
        return data
    }).catch((e) => {
        return e.response
    })
}

export const updateFav = async (userId, sampleId, action, callback) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/users/updateFav`
        const body = {
            "userId": userId,
            "sampleId": sampleId,
            "actionCode": action
        }
        const response = await axios.post(url, body)
        callback()
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updatePlan = async (userId, newPlan) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/users/updatePlan`
        const body = {
            "userId": userId,
            "newPlan": newPlan
        }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const changePassService = async (userEmail, pass, newPass) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/users/changePass`
        const body = {
            "email": userEmail,
            "password": pass,
            "newPass": newPass
        }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updatePassService = async (userEmail, newPass) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/users/updatePass`
        const body = {
            "email": userEmail,
            "newPass": newPass
        }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const sendVerifyCode = async (userEmail) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/users/sendCodeToMail`
        const body = {
            "email": userEmail
        }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        return error.response
    }
}

export const checkVerifyCode = async (userEmail, verificationCode) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/users/validateCode`
        const body = {
            "email": userEmail,
            "verificationCode": parseInt(verificationCode)
        }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        return error.response
    }
}