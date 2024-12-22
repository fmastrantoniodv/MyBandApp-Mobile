import httpClient from './httpClient'

export const createNewUser = async (body) => {
    try {
        console.log('[userServ].createNewUser.body=', body)
        const response = await httpClient.post(`/api/users/register`, body)
        console.log('[userServ].createNewUser.response=',response)
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
        console.log('[userServ].login.response=',response)
        return response
    } catch (error) {
        console.log('[userServ].login.error=',error)
        return error
    }
}

export const getUserFavsServ = async (userId) => {
    try {
        const response = await httpClient.get(`/api/users/getUserFavsList/${userId}`)
        console.log('[userServ].getUserFavsServ.response=',response)
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
        console.log('[userServ].updateFav.body=', body)
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
        console.log('[userServ].updatePlan.body=', body)
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
        console.log('[userServ].changePassService.body=', body)
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
        console.log('[userServ].updatePassService.body=', body)
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
        console.log('[userServ].sendVerifyCode.body=', body)
        const response = await httpClient.post(`/api/users/sendCodeToMail`, body)
        return response
    } catch (error) {
        console.error('[userServ].sendVerifyCode.error=', error)
        return error.response
    }
}

export const checkVerifyCode = async (userEmail, verificationCode) => {
    try {
        const body = {
            "email": userEmail,
            "verificationCode": parseInt(verificationCode)
        }
        console.log('[userServ].checkVerifyCode.body=', body)
        const response = await httpClient.post(`/api/users/validateCode`, body)
        return response
    } catch (error) {
        console.error('[userServ].checkVerifyCode.error=', error)
        return error.response
    }
}