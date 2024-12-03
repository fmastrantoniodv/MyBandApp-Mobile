import axios from 'axios'
import Constants from 'expo-constants';
const { ENDPOINT_BACKEND } = Constants.expoConfig.extra;

export const createNewProject = async (userId, projectName) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/project/create`
        const body = {
            "userId": userId,
            "projectName": projectName
        };
        const response = await axios.post(url, body)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteProject = async (userId, projectId) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/project/delete`
        const body = {
            "userId": userId,
            "projectId": projectId
        }
        const response = await axios.post(url, body)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getProjects = async (userId) => {
    try {
        const url = `${ENDPOINT_BACKEND}/api/project/getUserProjects/${userId}`
        const response = await axios.get(url)
        console.log("getProjects: ", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getProjectServ = async (projectId) => {
    return axios.
    get(`${ENDPOINT_BACKEND}/api/project/${projectId}`)
    .then((response) => {
        const data = response.data
        console.log('[getProject.js].getProject.data=',data)
        if(data === undefined){
            return 'ERROR'
        }
        if(response.status !== 200){
        console.log('[studio.jsx].[useEffect].setInitValues.data.status=', data.status)
        return 'ERROR'
        }
        return data
    }).catch((e) =>{
        console.log(e.response)
        return e.response
    })
}

export const saveProjectServ = async (projectData) => {
    return axios.
    post(`${ENDPOINT_BACKEND}/api/project/save`, projectData)
    .then((response) => {
        const data = response.data
        console.log('[saveProject.js].saveProject.data=',data)
        if(data === undefined){
            return 'ERROR'
        }
        if(response.status !== 200){
        console.log('[saveProject.js].data.status=', data.status)
        return 'ERROR'
        }
        return data
    }).catch((e) =>{
        console.log(e.response)
        return 'ERROR'
    })
}