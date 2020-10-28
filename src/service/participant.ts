
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
