import axios from 'axios'
import Constants from 'expo-constants';
const { ENDPOINT_BACKEND } = Constants.expoConfig.extra;

export const getCollections = async (plan) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/collections/plan/${plan}`
        const response = await axios.get(url)
        console.log("getCollections: ", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}