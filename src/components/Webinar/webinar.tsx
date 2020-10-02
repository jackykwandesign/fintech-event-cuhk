import React from 'react'
import { WebinarCard, WebinarInfo } from './webinarCard/webinarCard'
import styles from './webinar.module.css'
const tempData: WebinarInfo[] = []
let baseStartTime = new Date("2020-10-28 12:30:00")
let currentTime = new Date("2020-10-28 14:30:00")
function AddMinutes(oldDate:Date, minutes:number){
    return new Date(oldDate.getTime() + minutes * 60000)
}
for(let i = 0; i < 10; i++){
    tempData.push({
        name:`Hello to webinar # ${i+1}`,
        zoomURL:"https://cuhk.zoom.us/j/4955558513?pwd=VGlWOUp6dDRFV1NMZUNYZkZuNlg3QT09",
        replayURL:"https://www.google.com",
        startTime: AddMinutes(baseStartTime, i * 30),
        endTime:AddMinutes(baseStartTime, (i+1) * 30),
        // status:"OPEN"
    })
}   

const Webinar = (props:any)=>{


    return (
        <div className={styles.webinarContainer}>
            <h1>Incoming Webinar</h1>
            {
                tempData.map((event, index)=>{
                    if(currentTime <= event.endTime){
                        return (
                            <WebinarCard webinarInfo={event} replay={false}/>
                        )
                    }
                })
            }
            <h1>Webinar Replay</h1>
            {
                tempData.map((event, index)=>{
                    if(currentTime > event.endTime){
                        return (
                            <WebinarCard webinarInfo={event} replay={true}/>
                        )
                    }
                })
            }
        </div>
    )
}

export default Webinar