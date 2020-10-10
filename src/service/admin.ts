
import ConfigAxio from '../config/axioConfig'
import { DBUser } from '../contexts/firebaseContext/firebaseContext'

export const adminGetAllUser = async() =>{
    try {
        const res = await ConfigAxio.get('/api/user/')
        let users = res.data as DBUser[]
        return users
    } catch (error) {
        return undefined
    }
}
