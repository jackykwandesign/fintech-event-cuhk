
import { WebinarInfo } from '../components/Webinar/webinarCard/webinarCard'
import ConfigAxio from '../config/axioConfig'

export const getAllWebinar = async() =>{
    try {
        const res = await ConfigAxio.get('/api/webinar')
        let users = res.data as WebinarInfo[]
        return users
    } catch (error) {
        return undefined
    }
}

