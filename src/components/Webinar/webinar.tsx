import React, { useEffect, useState } from 'react'
import { WebinarCard, WebinarInfo } from './webinarCard/webinarCard'
import styles from './webinar.module.css'
// import { Divider } from '@material-ui/core'
import moment from 'moment'
// var db = firebase.firestore();
import ConfitFirebase from '../../config/firebaseConfig'
import { getAllWebinar } from '../../service/webinar'
import { useHistory, withRouter } from 'react-router-dom'
// import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
const db = ConfitFirebase.firestore()
let pastEventList = [
    {
        name:`Test past webinar 0 with replay url`,
        zoomURL:"https://cuhk.zoom.us/j/98163565145",
        description: [
            "This is for testing webinar with replay URL and past \n by Jacky Kwan"
        ],
        replayURL:"https://youtube.com",
        startTime: new Date('October 1, 2020 10:00:00 GMT+8:00'),
        endTime:    new Date('October 1, 2020 12:00:00 GMT+8:00'),
    },
    {
        name:`Test past webinar 1 with no replay url`,
        zoomURL:"https://cuhk.zoom.us/j/98163565145",
        description: [
            "This is for testing webinar with no replay URL and past \n by Jacky Kwan"
        ],
        replayURL:"",
        startTime: new Date('October 10, 2020 10:00:00 GMT+8:00'),
        endTime:    new Date('October 10, 2020 12:00:00 GMT+8:00'),
    },
    {
        name:`Test past webinar 2 with no replay url`,
        zoomURL:"https://cuhk.zoom.us/j/98163565145",
        description: [
            "This is for testing webinar with no replay URL and past \n by Jacky Kwan"
        ],
        replayURL:"",
        startTime: new Date('October 10, 2020 13:00:00 GMT+8:00'),
        endTime:    new Date('October 10, 2020 14:56:00 GMT+8:00'),
    },
]
let eventList = [
    {
        name:`ZOOM Webinar Rehearsal`,
        zoomURL:"https://cuhk.zoom.us/j/98163565145",
        description: [
            "This is for speakers doing rehearsal to connect to ZOOM Webinar and give the speech."
        ],
        replayURL:"",
        startTime: new Date('October 23, 2020 10:00:00 GMT+8:00'),
        endTime:    new Date('October 23, 2020 12:00:00 GMT+8:00'),
    },
    {
        name:`ZOOM Webinar Rehearsal - On-site`,
        zoomURL:"https://cuhk.zoom.us/j/98163565145",
        description: [
            "This is for Contractor testing the ZOOM Webinar connectivity after the Live Broadcast site setup."
        ],
        replayURL:"",
        startTime: new Date('October 29, 2020 14:30:00 GMT+8:00'),
        endTime:    new Date('October 29, 2020 16:30:00 GMT+8:00'),
    },
    {
        name:`ZOOM Webinar Rehearsal - On-site`,
        zoomURL:"https://cuhk.zoom.us/j/98163565145",
        description: [
            "This is for Committee testing the ZOOM Webinar connectivity after the Live Broadcast site setup.\nby Professor ABC",
            "This is for Event 2.\nby Professor DEF"
        ],
        replayURL:"",
        startTime: new Date('October 30, 2020 10:30:00 GMT+8:00'),
        endTime:    new Date('October 30, 2020 12:30:00 GMT+8:00'),
    },

    {
        name:`Session 1`,
        zoomURL:"https://cuhk.zoom.us/j/99104129354",
        description: [
            "Welcome Speeches & “Photo Session”",
            "Anomaly Detection for E-Payment Activities via Scalable Graph Representation Learning \nby Prof LAU Wing-Cheong, CUHK",
            "When Banks Meet DeFi (Decentralised Finance) – Chance or Challenges? \nby Ms Frankie TAM, Eversheds Sutherland",
            "Security Token Offering – New Way of Financing in the Digital Era \nby Prof Seen-Meng CHEW, CUHK & Dr Florian SPIEGL, FinFabrik",
        ],
        replayURL:"",
        startTime: new Date('November 2, 2020 9:30:00 GMT+8:00'),
        endTime:    new Date('November 2, 2020 11:15:00 GMT+8:00'),
    },

    {
        name:`Session 2`,
        zoomURL:"https://cuhk.zoom.us/j/93457562147",
        description: [
            "FinTech Reshaping the Future of Wealth Management \n by Mr Herman CHENG & Ms Rosita LEE, Hang Seng Bank",
            "Panel Discussion: Digitization of Financial Services in Asia",
        ],
        replayURL:"",
        startTime: new Date('November 2, 2020 11:30:00 GMT+8:00'),
        endTime:    new Date('November 2, 2020 12:35:00 GMT+8:00'),
    },

    {
        name:`Session 3`,
        zoomURL:"https://cuhk.zoom.us/j/96465995903",
        description: [
            "Alpha Go Everywhere: Machine Learning and International Stock Returns \n by Prof Darwin CHOI & Prof Griffin JIANG, CUHK",
            "FinTech @ HKEX (TBD) \n by Mr Adam WIELOWIEYSKI, HKEX",
        ],
        replayURL:"",
        startTime: new Date('November 2, 2020 13:20:00 GMT+8:00'),
        endTime:    new Date('November 2, 2020 14:10:00 GMT+8:00'),
    },

    {
        name:`Session 4`,
        zoomURL:"https://cuhk.zoom.us/j/97829441537",
        description: [
            "Can We Securely Outsource Big Data Analytics with Lightweight Cryptography? \n by Prof Sherman CHOW, CUHK",
            "See & Understand Data with Agility \n by Mr Philip YU, Tableau",
            "How FinTech Transforms Organizations \n by Mr Nike KONG & Ms May WONG, Hang Seng Bank",
        ],
        replayURL:"",
        startTime: new Date('November 2, 2020 14:25:00 GMT+8:00'),
        endTime:    new Date('November 2, 2020 15:40:00 GMT+8:00'),
    },
 
    {
        name:`Session 5`,
        zoomURL:"https://cuhk.zoom.us/j/93105948706",
        description: [
            "AI-powered Recruitment \n by Mr Chris LEUNG, IBM Services",
            "Advanced Technology to Support FinTech and Smart City \n by Dr Lucas HUI, ASTRI",
            "Panel Discussion: Is Open API Going to Open Up the Banking Habitat in Hong Kong?",
            "Closing Remarks",
        ],
        replayURL:"",
        startTime: new Date('November 2, 2020 15:55:00 GMT+8:00'),
        endTime:    new Date('November 2, 2020 17:30:00 GMT+8:00'),
    },   
 
]
function AddMinutes(oldDate:Date, minutes:number){
    return new Date(oldDate.getTime() + minutes * 60000)
}


let currentTime = new Date()

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
    let history = useHistory()
    async function initWebinar(){
        for(let i = 0; i < eventList.length; i++){
            db.collection("Webinar").add({
                name:   eventList[i].name,
                description:  eventList[i].description,
                zoomURL:     eventList[i].zoomURL,
                replayURL:  eventList[i].replayURL,
                startTime:  eventList[i].startTime.toISOString(),
                endTime:    eventList[i].endTime.toISOString(),
                status:"OPEN"
            })
        }
    }
    
    async function initPastWebinar(){
        for(let i = 0; i < pastEventList.length; i++){
            db.collection("Webinar").add({
                name:   pastEventList[i].name,
                description:  pastEventList[i].description,
                zoomURL:     pastEventList[i].zoomURL,
                replayURL:  pastEventList[i].replayURL,
                startTime:  pastEventList[i].startTime.toISOString(),
                endTime:    pastEventList[i].endTime.toISOString(),
                status:"CLOSE"
            })
        }
    }
    
    async function addLiveEvent(){
        let timeNow = new Date()
        db.collection("Webinar").add({
            name:   "Live event",
            description:  [
                "This is a Live event \n by IT tester"
            ],
            zoomURL:     "https://cuhk.zoom.us/j/93105948706",
            replayURL:  "https://youtube.com",
            startTime:  AddMinutes(timeNow, -30).toISOString(),
            endTime:    AddMinutes(timeNow, +30).toISOString(),
            status:"OPEN"
        }).then(res=>{
            history.go(0)
        })
        
    }
    
    // let tempData: WebinarInfo[] = []
    const [webinarList, setWebinarList] = useState<WebinarInfo[] | undefined>(undefined)
    useEffect(()=>{
        
        async function handleGetData(){
            const webinars = await getAllWebinar()
            webinars?.map((webinar, index)=>{
                webinar.startTime = moment(webinar.startTime).toDate()
                webinar.endTime = moment(webinar.endTime).toDate()
            })
            webinars?.sort(function(a,b){
                let firstTime = new Date(b.startTime).getTime()
                let secondTime = new Date(a.startTime).getTime()
                // smaller time first
                return (secondTime - firstTime)
            })
            setWebinarList(webinars)
            
        }
        handleGetData()
    },[])

    return (
        <div className={styles.webinarContainer}>
            
            <div className={styles.webinarSubContainer1}>
                {/* <div className={styles.sameRow}><h1>Upcoming Webinar</h1><Divider style={{width:"250px"}}/></div> */}
                {/* <div className={styles.sameRow}>
                <img src="/images/icon-webinar.png" width="250" height="250" />
                <h1>Upcoming Webinar</h1>
                </div> */}
                 <h1>Upcoming Webinar</h1>
                <button onClick = {addLiveEvent}>Add Live Event</button>
                {/* <button onClick = {initWebinar}>Add test Event</button> */}
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
            <div className={styles.webinarSubContainer2}>
                <h1>Webinar Replay</h1>
                {/* <button onClick = {initPastWebinar}>Add Past Event</button> */}
                {
                    webinarList && webinarList?.map((event, index)=>{
                        
                        if(event.endTime && currentTime >= event.endTime){
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

export default withRouter(Webinar)