
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

export const updateWebinarDetail = async(id:string, zoomURL:string, replayURL:string, replayPassword:string,) =>{
    try {


        const res = await ConfigAxio.patch('/api/webinar/updateWebinar',{
            id,
            zoomURL,
            replayURL,
            replayPassword,
        })
        return res
    } catch (error) {
        return undefined
    }
}
