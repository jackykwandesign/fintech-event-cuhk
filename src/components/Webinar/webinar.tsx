import React from 'react'
import { WebinarCard, WebinarInfo } from './webinarCard/webinarCard'
import styles from './webinar.module.css'
import { Divider } from '@material-ui/core'
const tempData: WebinarInfo[] = []

let currentTime = new Date()
function AddMinutes(oldDate:Date, minutes:number){
    return new Date(oldDate.getTime() + minutes * 60000)
}
for(let i = 0; i < 3; i++){
    tempData.push({
        name:`Hello to webinar # ${i+1}`,
        zoomURL:"https://cuhk.zoom.us/j/4955558513?pwd=VGlWOUp6dDRFV1NMZUNYZkZuNlg3QT09",
        replayURL:"https://www.google.com",
        startTime: AddMinutes(currentTime, -(8 - i) * 30),
        endTime:AddMinutes(currentTime, -(7 - i) * 30),
        // status:"OPEN"
    })
}   
for(let i = 3; i < 10; i++){
    tempData.push({
        name:`Hello to webinar # ${i+1}`,
        zoomURL:"https://cuhk.zoom.us/j/4955558513?pwd=VGlWOUp6dDRFV1NMZUNYZkZuNlg3QT09",
        replayURL:"",
        startTime: AddMinutes(currentTime, -(6 - i) * 30),
        endTime:AddMinutes(currentTime, -(5 - i) * 30),
        // status:"OPEN"
    })
}


const Webinar = (props:any)=>{


    return (
        <div className={styles.webinarContainer}>
            <div className={styles.webinarSubContainer}>
                {/* <div className={styles.sameRow}><h1>Upcoming Webinar</h1><Divider style={{width:"250px"}}/></div> */}
                <h1>Upcoming Webinar</h1>
                {
                    tempData.map((event, index)=>{
                        if(currentTime < event.endTime){
                            return (
                                <WebinarCard webinarInfo={event} replay={false} currentTime = {currentTime} key={"upcoming" + index}/>
                            )
                        }
                    })
                }
            </div>
            <div className={styles.webinarSubContainer}>
                <h1>Webinar Replay</h1>
                {
                    tempData.map((event, index)=>{
                        if(currentTime >= event.endTime){
                            return (
                                <WebinarCard webinarInfo={event} replay={true} currentTime = {currentTime} key={"Replay" + index}/>
                            )
                        }
                    })
                }
            </div>
                {/* <div>
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
                </div>
                <div>
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
                </div> */}

        </div>
    )
}

export default Webinar