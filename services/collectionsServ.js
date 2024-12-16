import httpClient from './httpClient'

export const getCollections = async (plan) => {
    try {
        const response = await httpClient.get(`/api/collections/plan/${plan}`)
        console.log("getCollections: ", response.data)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}