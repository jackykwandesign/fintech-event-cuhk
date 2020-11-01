
// import { WebinarInfo } from '../components/Webinar/webinarCard/webinarCard'
import ConfigAxio from '../config/axioConfig'
import { DBUser } from '../contexts/firebaseContext/firebaseContext'

export const getAllShareParticipant = async() =>{
    try {
        const res = await ConfigAxio.get('/api/user/shareParticipant')
        let users = res.data as DBUser[]
        return users
    } catch (error) {
        return undefined
    }
}

export const sendMessageToParticipant = async(message:string, email:string) =>{
    // console.log(`message: ${message}, email: ${email}`)
    try {
        const res = await ConfigAxio.post('/api/user/message',{
            message:message,
            receiverEmail:email,
        })
        return res
    } catch (error) {
        return undefined
    }
}

export const updateLastLoginTime = async() =>{
    try {
        const res = await ConfigAxio.post('/api/user/updateLoginTime')
        return res
    } catch (error) {
        return undefined
    }
}

