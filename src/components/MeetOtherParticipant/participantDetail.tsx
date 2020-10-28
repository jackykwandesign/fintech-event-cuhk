import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import { Democard, DemoData } from '../demoCard/demoCard'
// import { DemoList } from '../projectDemo'
import styles from './participantDetail.module.css'
import * as qs from 'query-string'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import { getAllShareParticipant } from '../../service/participant'
import { DBUser } from '../../contexts/firebaseContext/firebaseContext'

interface Params {
    gp?: number;
}
const interestParticipantList:(DBUser[])[] = [[],[],[],[],[]]

const ParticipantDetail = (prop:any) => {

    let history = useHistory()
    const [currentInterest, setcurrentInterest] = useState<string | undefined>("Big Data Analytics")
    const [currentParticipantList, setCurrentParticipantList] = useState<DBUser[]>([])
    const interestList = ["Big Data Analytics","FinTech in the Banking/Virtual Banking","AI and Machine Learning","STO/Tokenization/Virtual Assets","Cybersecurity"]
    
    const handleChangeInterest = async(index:number) =>{
        await setcurrentInterest(interestList[index])
        // console.log("Current:", interestList[index])
        await setCurrentParticipantList(interestParticipantList[index])
        // console.log("currentParticipantList:", interestParticipantList[index])
    }
    const getDataAsync = async() =>{
        const res = await getAllShareParticipant()
        console.log(res)
        res?.map(user=>{
            for(let i = 0; i < 5; i++){
                if(user.kycData.interestCheckbox.includes(interestList[i])){
                    interestParticipantList[i].push(user)
                }
            }
        })
        console.log("interestParticipantList", interestParticipantList)
        handleChangeInterest(0)
    }

    useEffect(()=>{
        getDataAsync()
    },[])


    return (
        <div >
            <table className={styles.demoDetailContainer} cellSpacing="0" cellPadding="0">
                <tr>
                    <td valign="top" className={styles.demoMenu}>
                        <p><img src="/images/icon-chatroom.png" width="250" height="250" /></p>
                        {
                            interestList.map((interest, index)=>{
                                return(
                                    <div onClick={()=>handleChangeInterest(index)} className={styles.demoMenuItem} key={"interest-"+index}>
                                        
                                        <Typography variant="body1" >
                                            <b>{interest}</b>
                                        </Typography>
                                        {interestList.length !== index + 1 && <br/>}
                                    </div>
                                )
                            })
                        }
                    </td>
                    <td valign="top"  style={{padding:"1vw", width:"100%", minWidth:"1150px"}}>
                        {
                            currentParticipantList.map((user, index)=>{
                                return (
                                <>
                                    <p key={"user"+index}>
                                        {user.name}-{user.kycData.jobTitle}@{user.kycData.organization}
                                    </p>
                                    <br/>
                                </>
                                )
                            })
                        }
                        {/* <table style={{border:0}} cellSpacing="0" cellPadding="10">
                            <tr>
                                <td colSpan={2} align="center" valign="top" className={styles.demoTitle}>
                                    <p style={{font:"Verdana, Geneva, sans-serif", fontSize:"20px", backgroundColor:"AEE4F7 !important"}}>

                                        <Typography component="h5" variant="h5" >
                                            <b>{currentInterest?.name}</b>
                                        </Typography>
                                        <Typography variant="h6" >
                                            {currentInterest?.investigatorShort}
                                        </Typography>
                       
                                        
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td valign="top">
                                    <br/>
                                    <Typography variant="subtitle1" color="initial">
                                        Investigator: {currentInterest?.investigator}
                                    </Typography>
                                    <br/>

                                {
                                    currentInterest?.description.length === 0 ? 

                                    <Typography variant="subtitle1" color="initial" >
                                        {" N/A "}
                                    </Typography>
                                    :
                                    currentInterest?.description.map((description, index)=>{
                                        return (
                                            <>
                                            
                                                <Typography variant="subtitle1" color="initial" className = {styles.demoContent}key = {`${currentInterest?.name}-desc-${index}`}>
                                                    {
                                                        description.title && <><b>{description.title}</b><br/></>
                                                    }
                                                    {
                                                        description.bold && 
                                                        description.bold ? <b>{description.content}</b> : description.content
                                                    }
                                                </Typography>
                                                {currentInterest?.description.length !== index + 1 && <br/>}
                                            </>
                                        ) 
                                    })
                                }

                                    <br/>
                                    <p>
                                        <em>
                                            Website: {currentInterest?.websiteURL  ? <a href={currentInterest?.websiteURL } target="_black" rel="noopener noreferrer">{currentInterest?.websiteURL}</a> : "N/A"}
                                        </em>
                                    </p>
                                    <br/>
                                    <p>
                                        <a href={currentInterest?.posterBig ? currentInterest?.posterBig : "/images/demo/poster/poster-default.jpg"} target="_black" rel="noopener noreferrer">
                                            <img src={currentInterest?.poster ? currentInterest?.poster : "/images/demo/poster/poster-default.jpg"} className={styles.demoPoster} alt={`${currentInterest?.name}-poster`} />
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </table> */}
                    </td>
                   
                </tr>
            </table>
        </div>

    )
}
export default ParticipantDetail
