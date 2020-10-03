import React, { useEffect, useState } from 'react'
import { WebinarCard, WebinarInfo } from './webinarCard/webinarCard'
import styles from './webinar.module.css'
// import { Divider } from '@material-ui/core'
import moment from 'moment'
// var db = firebase.firestore();
import ConfitFirebase from '../../config/firebaseConfig'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
const db = ConfitFirebase.firestore()





let currentTime = new Date()
function AddMinutes(oldDate:Date, minutes:number){
    return new Date(oldDate.getTime() + minutes * 60000)
}
// for(let i = 0; i < 3; i++){
//     // tempData.push({
//     //     name:`Hello to webinar # ${i+1}`,
//     //     zoomURL:"https://cuhk.zoom.us/j/4955558513?pwd=VGlWOUp6dDRFV1NMZUNYZkZuNlg3QT09",
//     //     replayURL:"https://www.google.com",
//     //     startTime: AddMinutes(currentTime, -(8 - i) * 30),
//     //     endTime:AddMinutes(currentTime, -(7 - i) * 30),
//     //     // status:"OPEN"
//     // })
//     db.collection("Webinar").add({
//         name:`Hello to webinar # ${i+1}`,
//         zoomURL:"https://cuhk.zoom.us/j/4955558513?pwd=VGlWOUp6dDRFV1NMZUNYZkZuNlg3QT09",
//         replayURL:"https://www.google.com",
//         startTime: moment(AddMinutes(currentTime, -(8 - i) * 30)).toISOString(),
//         endTime: moment(AddMinutes(currentTime, -(7 - i) * 30)).toISOString(),
//         // status:"OPEN"
//     })
//     .then(function(docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });

// }   
// for(let i = 3; i < 10; i++){
//     // tempData.push({
//     //     name:`Hello to webinar # ${i+1}`,
//     //     zoomURL:"https://cuhk.zoom.us/j/4955558513?pwd=VGlWOUp6dDRFV1NMZUNYZkZuNlg3QT09",
//     //     replayURL:"",
//     //     startTime: AddMinutes(currentTime, -(6 - i) * 30),
//     //     endTime:AddMinutes(currentTime, -(5 - i) * 30),
//     //     // status:"OPEN"
//     // })
//     db.collection("Webinar").add({
//         name:`Hello to webinar # ${i+1}`,
//         zoomURL:"https://cuhk.zoom.us/j/4955558513?pwd=VGlWOUp6dDRFV1NMZUNYZkZuNlg3QT09",
//         replayURL:"",
//         startTime: moment(AddMinutes(currentTime, -(6 - i) * 30)).toISOString(),
//         endTime: moment(AddMinutes(currentTime, -(5 - i) * 30)).toISOString(),
//         // status:"OPEN"
//     })
//     .then(function(docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });
// }


const Webinar = (props:any)=>{
    
    // let tempData: WebinarInfo[] = []
    const [webinarList, setWebinarList] = useState<WebinarInfo[] | undefined>(undefined)
    useEffect(()=>{
        
        async function handleGetData(){
            const tempData: WebinarInfo[] = []
            db.collection("Webinar").get().then((query)=>{
                query.forEach((doc)=>{
                    // console.log("doc",doc.data())
                    tempData.push({
                       name: doc.data().name,
                       zoomURL: doc.data().zoomURL,
                       replayURL: doc.data().replayURL,
                       startTime: moment(doc.data().startTime).toDate(),
                       endTime: moment(doc.data().endTime).toDate(),
                    })
                })
            })
            .then( async() => {
                tempData.sort(function(a,b){
                    let firstTime = new Date(b.startTime).getTime()
                    let secondTime = new Date(a.startTime).getTime()
                    // smaller time first
                    return (secondTime - firstTime)
                })
                setWebinarList(tempData)
                // console.log("Read Success");
            })
            .catch(function(error) {
                console.error("Read Fail");
            });
            
        }
        handleGetData()
    },[1])

    return (
        <div className={styles.webinarContainer}>

            <div className={styles.webinarSubContainer}>
                {/* <div className={styles.sameRow}><h1>Upcoming Webinar</h1><Divider style={{width:"250px"}}/></div> */}
                <h1>Upcoming Webinar</h1>
                {
                    webinarList && webinarList?.map((event, index)=>{
                        // console.log("check event", event)
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
                    webinarList && webinarList?.map((event, index)=>{
                        if(currentTime >= event.endTime){
                            return (
                                <WebinarCard webinarInfo={event} replay={true} currentTime = {currentTime} key={"Replay" + index}/>
                            )
                        }
                    })
                }
            </div>

        </div>
    )
}

export default Webinar