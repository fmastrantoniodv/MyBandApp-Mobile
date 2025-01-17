import httpClient from './httpClient'

export const createNewUser = async (body) => {
    try {
        const response = await httpClient.post(`/api/users/register`, body)
        return response
    } catch (error) {
        console.log('[userServ].createNewUser.error=',error)
        return error
    }
}

export const login = async (data) => {
    if(!data.email || !data.password) throw new Error('Campos vacíos')
    try {
        const body = {
            "email": data.email,
            "password": data.password
        }
        const response = await httpClient.post(`/api/users/login`, body)
        return response
    } catch (error) {
        console.log('[userServ].login.error=',error)
        return error
    }
}

export const getUserFavsServ = async (userId) => {
    try {
        const response = await httpClient.get(`/api/users/getUserFavsList/${userId}`)
        return response
    } catch (error) {
        console.log('[userServ].getUserFavsServ.error=',error)
        return error
    }
}

export const updateFav = async (userId, sampleId, action) => {
    try {
        const body = {
            "userId": userId,
            "sampleId": sampleId,
            "actionCode": action
        }
        const response = await httpClient.post(`/api/users/updateFav`, body)
        return response
    } catch (error) {
        console.error('[userServ].updateFav.error',error)
        throw error
    }
}

export const updatePlan = async (userId, newPlan) => {
    try {
        const body = {
            "userId": userId,
            "newPlan": newPlan
        }
        const response = await httpClient.post(`/api/users/updatePlan`, body)
        return response
    } catch (error) {
        console.error('[userServ].updatePlan.error=', error)
        throw error
    }
}

export const changePassService = async (userEmail, pass, newPass) => {
    try {
        const body = {
            "email": userEmail,
            "password": pass,
            "newPass": newPass
        }
        const response = await httpClient.post(`/api/users/changePass`, body)
        return response
    } catch (error) {
        console.error('[userServ].changePassService.error=', error)
        throw error
    }
}

export const updatePassService = async (userEmail, newPass) => {
    try {
        const body = {
            "email": userEmail,
            "newPass": newPass
        }
        const response = await httpClient.post(`/api/users/updatePass`, body)
        return response
    } catch (error) {
        console.error('[userServ].updatePassService.error=', error)
        throw error
    }
}

export const sendVerifyCode = async (userEmail) => {
    try {
        const body = {
            "email": userEmail
        }
        const response = await httpClient.post(`/api/users/sendCodeToMail`, body)
        return response
    } catch (error) {
        console.error('[userServ].sendVerifyCode.error=', error)
        return error
    }
}

export const checkVerifyCode = async (userEmail, verificationCode) => {
    try {
        const body = {
            "email": userEmail,
            "verificationCode": parseInt(verificationCode)
        }
        const response = await httpClient.post(`/api/users/validateCode`, body)
        return response
    } catch (error) {
        console.error('[userServ].checkVerifyCode.error=', error)
        return error
    }
}