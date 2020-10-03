// import ConfigAxio from '../config/axioConfig'

// import Axios from "axios"

import ConfigAxio from '../config/axioConfig'
import { DBUser } from '../contexts/firebaseContext/firebaseContext'

export const validateUser = async() =>{
    try {
        const res = await ConfigAxio.post('/api/auth/login')
        let user = <DBUser>res.data
        return user
    } catch (error) {
        return undefined
    }
}

export const registerUser = async() =>{
    try {
        await ConfigAxio.post('/api/auth/register')
    } catch (error) {
        return undefined
    }
}

export const validateUserByToken = async( token:string) =>{
    try {
        const res = await ConfigAxio.post('/api/auth/loginByToken',{
            accessToken:token
        })
        let user = <DBUser>res.data
        return user
    } catch (error) {
        return undefined
    }
}