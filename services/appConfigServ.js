import httpClient from './httpClient'

export const getPlanList = async (plan) => {
    try {
        const response = await httpClient.get(`/api/appConfig/getPlanList`)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}